export type InvoiceLanguage = "ro" | "ru" | "en";
export type InvoiceCurrency = "MDL" | "EUR" | "USD";

const SCALES = [1_000_000_000, 1_000_000, 1_000] as const;

function splitAmount(amount: number): { units: number; cents: number } {
  const totalCents = Math.round(Math.abs(amount) * 100);
  return { units: Math.floor(totalCents / 100), cents: totalCents % 100 };
}

function groups(n: number): { scale: number; value: number }[] {
  const out: { scale: number; value: number }[] = [];
  let rest = n;
  for (const scale of SCALES) {
    out.push({ scale, value: Math.floor(rest / scale) });
    rest %= scale;
  }
  out.push({ scale: 1, value: rest });
  return out;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function cents2(cents: number): string {
  return String(cents).padStart(2, "0");
}

// ---- Romanian -------------------------------------------------------------

const RO_ONES = ["", "", "", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă"];
const RO_TEENS = [
  "zece",
  "unsprezece",
  "",
  "treisprezece",
  "paisprezece",
  "cincisprezece",
  "șaisprezece",
  "șaptesprezece",
  "optsprezece",
  "nouăsprezece",
];
const RO_TENS = [
  "",
  "",
  "douăzeci",
  "treizeci",
  "patruzeci",
  "cincizeci",
  "șaizeci",
  "șaptezeci",
  "optzeci",
  "nouăzeci",
];

type RoGender = "m" | "f" | "n";

function roUnit(u: number, gender: RoGender): string {
  if (u === 1) return gender === "f" ? "una" : "unu";
  if (u === 2) return gender === "m" ? "doi" : "două";
  return RO_ONES[u] ?? "";
}

function roTriple(n: number, gender: RoGender, alone: boolean): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h === 1) parts.push("o sută");
  else if (h === 2) parts.push("două sute");
  else if (h > 2) parts.push(`${RO_ONES[h]} sute`);
  if (r === 1 && h === 0 && alone) parts.push(gender === "f" ? "o" : "un");
  else if (r === 12) parts.push(gender === "m" ? "doisprezece" : "douăsprezece");
  else if (r >= 10 && r < 20) parts.push(RO_TEENS[r - 10] ?? "");
  else if (r > 0 && r < 10) parts.push(roUnit(r, gender));
  else if (r >= 20) {
    const u = r % 10;
    const tens = RO_TENS[Math.floor(r / 10)] ?? "";
    parts.push(u ? `${tens} și ${roUnit(u, gender)}` : tens);
  }
  return parts.join(" ");
}

function roNeedsDe(n: number): boolean {
  const r = n % 100;
  return n > 0 && (r === 0 || r >= 20);
}

const RO_SCALE: Record<number, { one: string; many: string; gender: RoGender }> = {
  1_000_000_000: { one: "un miliard", many: "miliarde", gender: "n" },
  1_000_000: { one: "un milion", many: "milioane", gender: "n" },
  1_000: { one: "o mie", many: "mii", gender: "f" },
};

function roNumber(n: number): string {
  if (n === 0) return "zero";
  const parts: string[] = [];
  for (const { scale, value } of groups(n)) {
    if (value === 0) continue;
    const def = RO_SCALE[scale];
    if (!def) {
      parts.push(roTriple(value, "m", n === 1));
    } else if (value === 1) {
      parts.push(def.one);
    } else {
      const words = roTriple(value, def.gender, false);
      parts.push(`${words}${roNeedsDe(value) ? " de " : " "}${def.many}`);
    }
  }
  return parts.join(" ");
}

const RO_CURRENCY: Record<
  InvoiceCurrency,
  { one: string; many: string; subOne: string; subMany: string }
> = {
  MDL: { one: "leu", many: "lei", subOne: "ban", subMany: "bani" },
  EUR: { one: "euro", many: "euro", subOne: "cent", subMany: "cenți" },
  USD: { one: "dolar", many: "dolari", subOne: "cent", subMany: "cenți" },
};

function roAmount(units: number, cents: number, currency: InvoiceCurrency): string {
  const c = RO_CURRENCY[currency];
  const unitWord = units === 1 ? c.one : c.many;
  const de = roNeedsDe(units) ? "de " : "";
  const sub = cents === 1 ? c.subOne : c.subMany;
  return `${capitalize(roNumber(units))} ${de}${unitWord} ${cents2(cents)} ${sub}`;
}

// ---- Russian --------------------------------------------------------------

const RU_ONES = [
  "",
  "",
  "",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
];
const RU_TEENS = [
  "десять",
  "одиннадцать",
  "двенадцать",
  "тринадцать",
  "четырнадцать",
  "пятнадцать",
  "шестнадцать",
  "семнадцать",
  "восемнадцать",
  "девятнадцать",
];
const RU_TENS = [
  "",
  "",
  "двадцать",
  "тридцать",
  "сорок",
  "пятьдесят",
  "шестьдесят",
  "семьдесят",
  "восемьдесят",
  "девяносто",
];
const RU_HUNDREDS = [
  "",
  "сто",
  "двести",
  "триста",
  "четыреста",
  "пятьсот",
  "шестьсот",
  "семьсот",
  "восемьсот",
  "девятьсот",
];

type RuForms = [one: string, few: string, many: string];

function ruPlural(n: number, forms: RuForms): string {
  const r100 = n % 100;
  const r10 = n % 10;
  if (r100 >= 11 && r100 <= 14) return forms[2];
  if (r10 === 1) return forms[0];
  if (r10 >= 2 && r10 <= 4) return forms[1];
  return forms[2];
}

function ruUnit(u: number, fem: boolean): string {
  if (u === 1) return fem ? "одна" : "один";
  if (u === 2) return fem ? "две" : "два";
  return RU_ONES[u] ?? "";
}

function ruTriple(n: number, fem: boolean): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) parts.push(RU_HUNDREDS[h] ?? "");
  if (r >= 10 && r < 20) parts.push(RU_TEENS[r - 10] ?? "");
  else {
    const t = Math.floor(r / 10);
    const u = r % 10;
    if (t) parts.push(RU_TENS[t] ?? "");
    if (u) parts.push(ruUnit(u, fem));
  }
  return parts.join(" ");
}

const RU_SCALE: Record<number, { forms: RuForms; fem: boolean }> = {
  1_000_000_000: { forms: ["миллиард", "миллиарда", "миллиардов"], fem: false },
  1_000_000: { forms: ["миллион", "миллиона", "миллионов"], fem: false },
  1_000: { forms: ["тысяча", "тысячи", "тысяч"], fem: true },
};

function ruNumber(n: number): string {
  if (n === 0) return "ноль";
  const parts: string[] = [];
  for (const { scale, value } of groups(n)) {
    if (value === 0) continue;
    const def = RU_SCALE[scale];
    if (!def) parts.push(ruTriple(value, false));
    else parts.push(`${ruTriple(value, def.fem)} ${ruPlural(value, def.forms)}`);
  }
  return parts.join(" ");
}

const RU_CURRENCY: Record<InvoiceCurrency, { unit: RuForms; sub: RuForms }> = {
  MDL: { unit: ["лей", "лея", "леев"], sub: ["бан", "бана", "бань"] },
  EUR: { unit: ["евро", "евро", "евро"], sub: ["цент", "цента", "центов"] },
  USD: { unit: ["доллар", "доллара", "долларов"], sub: ["цент", "цента", "центов"] },
};

function ruAmount(units: number, cents: number, currency: InvoiceCurrency): string {
  const c = RU_CURRENCY[currency];
  return `${capitalize(ruNumber(units))} ${ruPlural(units, c.unit)} ${cents2(cents)} ${ruPlural(cents, c.sub)}`;
}

// ---- English --------------------------------------------------------------

const EN_ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const EN_TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const EN_SCALE: Record<number, string> = {
  1_000_000_000: "billion",
  1_000_000: "million",
  1_000: "thousand",
};

function enTriple(n: number): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) parts.push(`${EN_ONES[h]} hundred`);
  if (r > 0 && r < 20) parts.push(EN_ONES[r] ?? "");
  else if (r >= 20) {
    const u = r % 10;
    const tens = EN_TENS[Math.floor(r / 10)] ?? "";
    parts.push(u ? `${tens}-${EN_ONES[u]}` : tens);
  }
  return parts.join(" ");
}

function enNumber(n: number): string {
  if (n === 0) return "zero";
  const parts: string[] = [];
  for (const { scale, value } of groups(n)) {
    if (value === 0) continue;
    const word = EN_SCALE[scale];
    parts.push(word ? `${enTriple(value)} ${word}` : enTriple(value));
  }
  return parts.join(" ");
}

const EN_CURRENCY: Record<
  InvoiceCurrency,
  { one: string; many: string; subOne: string; subMany: string }
> = {
  MDL: { one: "leu", many: "lei", subOne: "ban", subMany: "bani" },
  EUR: { one: "euro", many: "euro", subOne: "cent", subMany: "cents" },
  USD: { one: "dollar", many: "dollars", subOne: "cent", subMany: "cents" },
};

function enAmount(units: number, cents: number, currency: InvoiceCurrency): string {
  const c = EN_CURRENCY[currency];
  const unitWord = units === 1 ? c.one : c.many;
  const sub = cents === 1 ? c.subOne : c.subMany;
  return `${capitalize(enNumber(units))} ${unitWord} ${cents2(cents)} ${sub}`;
}

export function amountInWords(
  amount: number,
  currency: InvoiceCurrency,
  language: InvoiceLanguage,
): string {
  const { units, cents } = splitAmount(amount);
  if (language === "ru") return ruAmount(units, cents, currency);
  if (language === "en") return enAmount(units, cents, currency);
  return roAmount(units, cents, currency);
}
