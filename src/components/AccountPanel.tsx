'use client';

import { useEffect, useState } from 'react';
import { emptyProfile, messageFor, useAccount, type AccountProfile } from '../context/AccountContext';
import { containsUnsafeText } from '../utils/validation';

type Mode = 'signin' | 'signup' | 'profile';

export default function AccountPanel() {
  const { user, ready, identityEnabled, settings, accountOpen, setAccountOpen, profile, signIn, signUp, signOut, saveProfile, requestReset, startGoogleLogin } = useAccount();
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [details, setDetails] = useState<AccountProfile>(emptyProfile);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!accountOpen) return;
    const timer = window.setTimeout(() => {
      setMode(user ? 'profile' : 'signin');
      setDetails(profile);
      setName(profile.fullName);
      setEmail(user?.email ?? '');
      setPassword('');
      setStatus('');
    }, 0);
    document.body.classList.add('modal-open');
    return () => { window.clearTimeout(timer); document.body.classList.remove('modal-open'); };
  }, [accountOpen, user, profile]);

  if (!accountOpen) return null;
  const close = () => setAccountOpen(false);

  const acceptPublicText = (value: string, update: () => void) => {
    if (containsUnsafeText(value)) {
      setStatus('For security, use plain text only. That entry was not added.');
      return;
    }
    setStatus('');
    update();
  };

  const submitAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(''); setBusy(true);
    try {
      if (mode === 'signup') {
        await signUp(name, email, password);
        setStatus('Check your email to confirm your YNL Account, then return here to sign in.');
        setMode('signin');
        setPassword('');
      } else {
        await signIn(email, password);
        close();
      }
    } catch (error) { setStatus(messageFor(error)); }
    finally { setBusy(false); }
  };

  const submitProfile = async (event: React.FormEvent) => {
    event.preventDefault(); setStatus(''); setBusy(true);
    try { await saveProfile(details); setStatus('Your YNL Account has been updated.'); }
    catch (error) { setStatus(messageFor(error)); }
    finally { setBusy(false); }
  };

  return (
    <div className="account-overlay" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <section className="account-panel" role="dialog" aria-modal="true" aria-labelledby="account-panel-title">
        <button className="modal-close" onClick={close} aria-label="Close YNL Account">Close <span>×</span></button>
        <p className="eyebrow">YEENKSLUXE</p>
        <h2 id="account-panel-title">{user ? `Welcome${user.name ? `, ${user.name.split(' ')[0]}` : ''}.` : 'YNL Account.'}</h2>
        {!ready ? <p className="account-muted">Preparing your account…</p> : !identityEnabled ? <p className="account-muted">YNL Account is being activated. Please check back shortly.</p> : user ? (
          <form className="account-form" onSubmit={submitProfile}>
            <p className="account-intro">Save your delivery details and preferred fit for a quicker checkout.</p>
            <div className="account-email">{user.email}</div>
            <label><span>Full name</span><input value={details.fullName} onChange={event => acceptPublicText(event.target.value, () => setDetails({ ...details, fullName: event.target.value }))} maxLength={80} autoComplete="name" /></label>
            <label><span>Phone number</span><input value={details.phone} onChange={event => acceptPublicText(event.target.value, () => setDetails({ ...details, phone: event.target.value }))} maxLength={32} autoComplete="tel" inputMode="tel" /></label>
            <label><span>City / State</span><input value={details.city} onChange={event => acceptPublicText(event.target.value, () => setDetails({ ...details, city: event.target.value }))} maxLength={80} autoComplete="address-level2" /></label>
            <label><span>Preferred size</span><select value={details.preferredSize} onChange={event => setDetails({ ...details, preferredSize: event.target.value })}><option value="">Select when ready</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>One Size</option></select></label>
            <label><span>Delivery address</span><textarea rows={3} value={details.address} onChange={event => acceptPublicText(event.target.value, () => setDetails({ ...details, address: event.target.value }))} maxLength={180} autoComplete="street-address" /></label>
            {status && <p className="account-status" role="status">{status}</p>}
            <button className="button button-dark" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save account details'} <span>↗</span></button>
            <button className="account-secondary" type="button" onClick={() => { signOut().catch(error => setStatus(messageFor(error))); }}>Sign out</button>
          </form>
        ) : (
          <>
            <p className="account-intro">Save pieces, remember your fit and make your next order easier.</p>
            <form className="account-form" onSubmit={submitAuth}>
              {mode === 'signup' && <label><span>Full name</span><input value={name} onChange={event => acceptPublicText(event.target.value, () => setName(event.target.value))} required maxLength={80} autoComplete="name" /></label>}
              <label><span>Email address</span><input type="email" value={email} onChange={event => acceptPublicText(event.target.value, () => setEmail(event.target.value))} required maxLength={254} autoComplete="email" /></label>
              <label><span>Password</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} required minLength={mode === 'signup' ? 12 : 8} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /></label>
              {mode === 'signup' && <p className="account-password-help">12+ characters, including upper-case, lower-case and a number.</p>}
              {status && <p className="account-status" role="status">{status}</p>}
              <button className="button button-dark" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create YNL Account' : 'Sign in'} <span>↗</span></button>
            </form>
            {settings?.providers.google && <button className="account-google" onClick={startGoogleLogin}>Continue with Google</button>}
            <div className="account-actions">
              {!settings?.disableSignup && <button onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setStatus(''); }}> {mode === 'signup' ? 'Already have an account? Sign in' : 'New here? Create an account'} </button>}
              {mode === 'signin' && <button onClick={() => { if (!email) return setStatus('Enter your email first, then choose password reset.'); requestReset(email).then(() => setStatus('Check your email for the password reset link.')).catch(error => setStatus(messageFor(error))); }}>Forgot password?</button>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
