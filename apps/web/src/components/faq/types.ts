import { useLingui } from "@lingui/react/macro";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  cat: string;
  items: FaqItem[];
}

export interface ResponseLabels {
  eyebrow: string;
  phone: string;
  email: string;
  response: string;
  responseVal: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderQuestion: string;
}

export interface Topic {
  v: string;
  l: string;
}

export function useTopics(): Topic[] {
  const { t } = useLingui();
  return [
    { v: "general", l: t`General` },
    { v: "contabilitate", l: t`Contabilitate` },
    {
      v: "juridic",
      l: t({
        message: `Juridic`,
        comment:
          "FAQ category. Romanian adjective used as a noun = 'Legal services'.",
      }),
    },
    { v: "hr", l: t`HR` },
    { v: "pricing", l: t`Prețuri & Contract` },
    { v: "securitate", l: t`Securitate & GDPR` },
  ];
}

export function useResponseLabels(): ResponseLabels {
  const { t } = useLingui();
  return {
    eyebrow: t`Telefon`,
    phone: t`Telefon`,
    email: t`Email`,
    response: t`Răspuns`,
    responseVal: t`în maxim 4 ore (L–V)`,
    placeholderName: t({
      message: `Ion Popescu`,
      comment:
        "Placeholder text inside the 'Name' field on the FAQ form. Common Moldovan name — transliterate (e.g. RU 'Ион Попеску'), don't replace.",
    }),
    placeholderEmail: t({
      message: `ion@firma.md`,
      comment:
        "Placeholder text inside the 'Email' field on the FAQ form. Sample address — use a locale-appropriate example domain.",
    }),
    placeholderQuestion: t`Descrie întrebarea ta în câteva propoziții — cu cât mai concret, cu atât răspundem mai precis.`,
  };
}
