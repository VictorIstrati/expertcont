import type { Locale } from "@expertcont/i18n";

const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://expertcont.md";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export interface ArticleInput {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  locale: Locale;
  imageUrl?: string;
  section?: string;
}

export function articleJsonLd(a: ArticleInput) {
  // Google's Article rich result requires `image`; fall back to the sitewide
  // OG image so the rule is always satisfied even when the article doesn't
  // provide a custom hero yet.
  const image = a.imageUrl ?? `${SITE_URL}/og.png`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: a.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${a.url}` },
    publisher: {
      "@type": "Organization",
      name: "ExpertCont",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/logo-vertical.png` },
    },
    ...(a.author ? { author: { "@type": "Person", name: a.author } } : {}),
    ...(a.section ? { articleSection: a.section } : {}),
  };
}

export interface FaqEntry {
  q: string;
  a: string;
}

export function faqPageJsonLd(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

export interface ServiceInput {
  url: string;
  name: string;
  description: string;
  locale: Locale;
}

export function serviceJsonLd(s: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    inLanguage: s.locale,
    serviceType: s.name,
    provider: {
      "@type": "Organization",
      name: "ExpertCont",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Moldova" },
    url: `${SITE_URL}${s.url}`,
  };
}
