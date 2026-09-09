export class InputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputValidationError';
  }
}

const UNSAFE_TEXT = /[\u0000-\u001F\u007F<>]|(?:javascript|vbscript)\s*:|data\s*:\s*text\/html|on[a-z]+\s*=|(?:document|window|globalthis)\s*\.|(?:eval|function|settimeout|setinterval)\s*\(/i;

export function normaliseText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function containsUnsafeText(value: unknown) {
  return typeof value === 'string' && UNSAFE_TEXT.test(value);
}

export function safeText(value: unknown, maxLength: number, label: string, required = false) {
  if (containsUnsafeText(value)) throw new InputValidationError(`${label} must contain plain text only.`);
  const text = normaliseText(value, maxLength);
  if (required && !text) throw new InputValidationError(`Enter your ${label.toLowerCase()}.`);
  return text;
}

export function safeEmail(value: unknown, required = true) {
  const email = safeText(value, 254, 'Email address', required).toLowerCase();
  if (!email && !required) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InputValidationError('Enter a valid email address.');
  return email;
}

export function safePhone(value: unknown, required = false) {
  const phone = safeText(value, 32, 'Phone number', required);
  if (!phone && !required) return '';
  if (!/^\+?[0-9][0-9\s()-]{6,30}$/.test(phone)) throw new InputValidationError('Enter a valid phone number.');
  return phone;
}

export function safeName(value: unknown, required = false) {
  const name = safeText(value, 80, 'Full name', required);
  if (!name && !required) return '';
  if (name.length < 2 || !/^[\p{L}][\p{L}\p{M}\s'.-]*$/u.test(name)) throw new InputValidationError('Enter a valid full name.');
  return name;
}

export function safeLocation(value: unknown, label: string, maxLength: number, required = false) {
  const text = safeText(value, maxLength, label, required);
  if (!text && !required) return '';
  if (!/[\p{L}\p{N}]/u.test(text)) throw new InputValidationError(`Enter a valid ${label.toLowerCase()}.`);
  return text;
}

export function fieldError(action: () => unknown) {
  try {
    action();
    return '';
  } catch (error) {
    return error instanceof InputValidationError ? error.message : 'Check this field and try again.';
  }
}
