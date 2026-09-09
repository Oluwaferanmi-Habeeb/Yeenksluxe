'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  AuthError,
  MissingIdentityError,
  getSettings,
  getUser,
  handleAuthCallback,
  login,
  logout,
  oauthLogin,
  onAuthChange,
  requestPasswordRecovery,
  signup,
  updateUser,
  type Settings,
  type User,
} from '@netlify/identity';
import { InputValidationError, containsUnsafeText, normaliseText, safeEmail, safeLocation, safeName, safePhone } from '../utils/validation';

export interface AccountProfile {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  preferredSize: string;
}

interface AccountContextType {
  user: User | null;
  ready: boolean;
  identityEnabled: boolean;
  settings: Settings | null;
  recoveryPending: boolean;
  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  profile: AccountProfile;
  savedProductIds: string[];
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveProfile: (profile: AccountProfile) => Promise<void>;
  toggleSavedProduct: (productId: string) => Promise<boolean>;
  recordOrderReference: (reference: string) => Promise<void>;
  requestReset: (email: string) => Promise<void>;
  completePasswordReset: (password: string) => Promise<void>;
  startGoogleLogin: () => void;
}

const emptyProfile: AccountProfile = { fullName: '', phone: '', city: '', address: '', preferredSize: '' };
const AccountContext = createContext<AccountContextType | undefined>(undefined);

const IDENTITY_TIMEOUT_MS = 12_000;

class IdentityTimeoutError extends Error {
  constructor() {
    super('The request took too long. Please check your connection and try again.');
    this.name = 'IdentityTimeoutError';
  }
}

async function withTimeout<T>(operation: Promise<T>, timeoutMs = IDENTITY_TIMEOUT_MS): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_, reject) => { timer = setTimeout(() => reject(new IdentityTimeoutError()), timeoutMs); }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function retryRead<T>(operation: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try { return await withTimeout(operation()); }
    catch (error) { lastError = error; if (attempt + 1 < attempts) await new Promise(resolve => setTimeout(resolve, 350 * (attempt + 1))); }
  }
  throw lastError;
}

function cleanStoredText(value: unknown, maxLength: number) {
  return containsUnsafeText(value) ? '' : normaliseText(value, maxLength);
}

function assertStrongPassword(password: string) {
  if (password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new AuthError('Use a stronger password.');
  }
}

function readProfile(user: User | null): AccountProfile {
  const data = user?.userMetadata ?? {};
  const value = (key: string, maxLength: number) => cleanStoredText(data[key], maxLength);
  return {
    fullName: value('full_name', 80) || cleanStoredText(user?.name, 80),
    phone: containsUnsafeText(data.phone) ? '' : normaliseText(data.phone, 32),
    city: value('city', 80),
    address: value('address', 180),
    preferredSize: value('preferred_size', 16),
  };
}

function readSavedProducts(user: User | null): string[] {
  const value = user?.userMetadata?.saved_product_ids;
  return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(id)).slice(0, 80) : [];
}

function messageFor(error: unknown) {
  if (error instanceof InputValidationError || error instanceof IdentityTimeoutError) return error.message;
  if (error instanceof MissingIdentityError) return 'YNL Account is being activated. Please try again shortly.';
  if (error instanceof AuthError) {
    if (error.status === 401) return 'Incorrect email or password.';
    if (error.status === 403) return 'That action is not available right now.';
    if (error.status === 422) return 'Please check the details and try again.';
    return 'We could not complete that request. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [identityEnabled, setIdentityEnabled] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [recoveryPending, setRecoveryPending] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    let live = true;
    const initialise = async () => {
      try {
        const callback = await withTimeout(handleAuthCallback());
        const [currentUser, projectSettings] = await Promise.all([retryRead(getUser), retryRead(getSettings)]);
        if (!live) return;
        setUser(callback?.user ?? currentUser);
        setSettings(projectSettings);
        if (callback?.type === 'recovery') {
          setRecoveryPending(true);
          setAccountOpen(true);
        }
      } catch (error) {
        if (live && error instanceof MissingIdentityError) setIdentityEnabled(false);
      } finally {
        if (live) setReady(true);
      }
    };
    initialise();
    const unsubscribe = onAuthChange((_event, currentUser) => { if (live) setUser(currentUser); });
    return () => { live = false; unsubscribe(); };
  }, []);

  const ensureEnabled = () => {
    if (!identityEnabled) throw new MissingIdentityError();
  };

  const signIn = async (email: string, password: string) => {
    ensureEnabled();
    const next = await withTimeout(login(safeEmail(email), password));
    setUser(next);
  };

  const signUp = async (name: string, email: string, password: string) => {
    ensureEnabled();
    assertStrongPassword(password);
    const fullName = safeName(name, true);
    const next = await withTimeout(signup(safeEmail(email), password, { full_name: fullName }));
    setUser(next.confirmedAt ? next : null);
  };

  const signOut = async () => {
    await withTimeout(logout());
    setUser(null);
    setRecoveryPending(false);
  };

  const saveProfile = async (nextProfile: AccountProfile) => {
    ensureEnabled();
    const fullName = safeName(nextProfile.fullName, false);
    const phone = safePhone(nextProfile.phone, false);
    const city = safeLocation(nextProfile.city, 'City / State', 80, false);
    const address = safeLocation(nextProfile.address, 'Delivery address', 180, false);
    if (!fullName && !phone && !city && !address) throw new InputValidationError('Add at least one valid account detail before saving.');
    const next = await withTimeout(updateUser({
      data: {
        ...(user?.userMetadata ?? {}),
        full_name: fullName,
        phone,
        city,
        address,
        preferred_size: normaliseText(nextProfile.preferredSize, 16),
      },
    }));
    setUser(next);
  };

  const toggleSavedProduct = async (productId: string) => {
    if (!user) {
      setAccountOpen(true);
      return false;
    }
    ensureEnabled();
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(productId)) throw new AuthError('This piece cannot be saved.');
    const saved = readSavedProducts(user);
    const nextSaved = saved.includes(productId) ? saved.filter(id => id !== productId) : [...saved, productId].slice(-80);
    const next = await withTimeout(updateUser({ data: { ...(user.userMetadata ?? {}), saved_product_ids: nextSaved } }));
    setUser(next);
    return nextSaved.includes(productId);
  };

  const recordOrderReference = async (reference: string) => {
    if (!user || !identityEnabled) return;
    try {
      const next = await withTimeout(updateUser({ data: { ...(user.userMetadata ?? {}), last_order_reference: reference } }));
      setUser(next);
    } catch { /* The WhatsApp order remains valid even if profile storage is unavailable. */ }
  };

  const requestReset = async (email: string) => {
    ensureEnabled();
    await withTimeout(requestPasswordRecovery(safeEmail(email)));
  };

  const completePasswordReset = async (password: string) => {
    ensureEnabled();
    assertStrongPassword(password);
    const next = await withTimeout(updateUser({ password }));
    setUser(next);
    setRecoveryPending(false);
  };

  const profile = useMemo(() => readProfile(user), [user]);
  const savedProductIds = useMemo(() => readSavedProducts(user), [user]);

  return <AccountContext.Provider value={{
    user, ready, identityEnabled, settings, recoveryPending, accountOpen, setAccountOpen, profile, savedProductIds,
    signIn, signUp, signOut, saveProfile, toggleSavedProduct, recordOrderReference, requestReset,
    completePasswordReset,
    startGoogleLogin: () => oauthLogin('google'),
  }}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount must be used within AccountProvider');
  return context;
}

export { messageFor, emptyProfile };
