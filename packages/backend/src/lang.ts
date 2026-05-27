import { detectAll } from "tinyld";
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "./types.js";

/**
 * Detect the language of free-form text and snap it to one of our supported
 * locales (ro/ru/en). If detection is unreliable or returns a language we
 * don't support, fall back to DEFAULT_LANGUAGE.
 */
export function detectLanguage(text: string, fallback: Language = DEFAULT_LANGUAGE): Language {
  const cleaned = text?.trim();
  if (!cleaned || cleaned.length < 4) return fallback;

  const candidates = detectAll(cleaned);
  for (const c of candidates) {
    if ((LANGUAGES as readonly string[]).includes(c.lang)) {
      return c.lang as Language;
    }
  }
  return fallback;
}

export { LANGUAGES, DEFAULT_LANGUAGE, type Language } from "./types.js";
