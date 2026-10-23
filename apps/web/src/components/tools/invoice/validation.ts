export function normalizeIban(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function isValidIban(value: string): boolean {
  const iban = normalizeIban(value);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(iban)) return false;
  if (iban.startsWith("MD") && iban.length !== 24) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const code = ch >= "A" && ch <= "Z" ? String(ch.charCodeAt(0) - 55) : ch;
    for (const digit of code) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }
  return remainder === 1;
}

export function formatIban(value: string): string {
  return normalizeIban(value).replace(/(.{4})/g, "$1 ").trim();
}

export function isValidIdno(value: string): boolean {
  return /^\d{13}$/.test(value.trim());
}
