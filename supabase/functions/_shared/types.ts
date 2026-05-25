export const LANGUAGES = ['ro', 'ru', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'ro';

export function normalizeLanguage(input: unknown): Language {
  return typeof input === 'string' && (LANGUAGES as readonly string[]).includes(input)
    ? (input as Language)
    : DEFAULT_LANGUAGE;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 320 && EMAIL_RE.test(value);
}

export function clampString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export function requireString(value: unknown, max: number): string | null {
  const s = clampString(value, max);
  return s && s.length > 0 ? s : null;
}
