import { getCollection } from "astro:content";
import { detailUrl, homeUrl, sectionUrl, type Locale } from "@expertcont/i18n";

const LABELS: Record<
  Locale,
  {
    readTimeLabel: string;
    readLabel: string;
    featuredLabel: string;
    noResultsLabel: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
    pageEyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    pageBreadcrumbHome: string;
    pageBreadcrumbCurrent: string;
    categories: string[];
  }
> = {
  ro: {
    readTimeLabel: "min citire",
    readLabel: "Citește ghidul",
    featuredLabel: "Featured",
    noResultsLabel: "Nu am găsit ghiduri pentru filtrele selectate.",
    ctaTitle: "Ai nevoie de ajutor personalizat?",
    ctaBody:
      "Echipa noastră de experți poate răspunde la orice întrebare specifică situației tale.",
    ctaBtn: "Programează consultație",
    pageEyebrow: "Ghiduri",
    pageTitle: "Toate ghidurile",
    pageSubtitle:
      "Resurse practice pentru a naviga prin cerințele administrative, fiscale și juridice ale afacerilor din Moldova.",
    pageBreadcrumbHome: "Acasă",
    pageBreadcrumbCurrent: "Ghiduri",
    categories: ["Toate"],
  },
  ru: {
    readTimeLabel: "мин чтения",
    readLabel: "Читать руководство",
    featuredLabel: "Избранное",
    noResultsLabel: "Руководств по выбранным фильтрам не найдено.",
    ctaTitle: "Нужна персональная помощь?",
    ctaBody:
      "Наша команда экспертов может ответить на любой вопрос, специфичный для вашей ситуации.",
    ctaBtn: "Записаться на консультацию",
    pageEyebrow: "Руководства",
    pageTitle: "Все руководства",
    pageSubtitle:
      "Практические ресурсы для навигации в административных, налоговых и правовых требованиях бизнеса в Молдове.",
    pageBreadcrumbHome: "Главная",
    pageBreadcrumbCurrent: "Руководства",
    categories: ["Все"],
  },
  en: {
    readTimeLabel: "min read",
    readLabel: "Read guide",
    featuredLabel: "Featured",
    noResultsLabel: "No guides found for the selected filters.",
    ctaTitle: "Need personalised help?",
    ctaBody: "Our team of experts can answer any question specific to your situation.",
    ctaBtn: "Schedule consultation",
    pageEyebrow: "Guides",
    pageTitle: "All guides",
    pageSubtitle:
      "Practical resources for navigating the administrative, tax, and legal requirements of running a business in Moldova.",
    pageBreadcrumbHome: "Home",
    pageBreadcrumbCurrent: "Guides",
    categories: ["All"],
  },
};

export async function guidesIndexProps(locale: Locale) {
  const metas = await getCollection("guides-meta");
  const labels = LABELS[locale];

  const guides = metas.map((entry) => {
    const m = entry.data;
    return {
      slug: m.slugs[locale],
      href: detailUrl("guides", m, locale),
      category: m.category[locale],
      title: m.titles[locale],
      excerpt: m.summaries[locale],
      readTime: m.readTime,
      featured: m.featured,
    };
  });

  const categorySet = new Set<string>([labels.categories[0] ?? "All"]);
  for (const g of guides) categorySet.add(g.category);

  return {
    locale,
    guides,
    categories: [...categorySet],
    readTimeLabel: labels.readTimeLabel,
    readLabel: labels.readLabel,
    featuredLabel: labels.featuredLabel,
    noResultsLabel: labels.noResultsLabel,
    ctaTitle: labels.ctaTitle,
    ctaBody: labels.ctaBody,
    ctaBtn: labels.ctaBtn,
    pageEyebrow: labels.pageEyebrow,
    pageTitle: labels.pageTitle,
    pageSubtitle: labels.pageSubtitle,
    pageBreadcrumbHome: labels.pageBreadcrumbHome,
    pageBreadcrumbCurrent: labels.pageBreadcrumbCurrent,
    homeHref: homeUrl(locale),
    contactHref: sectionUrl("contact", locale),
  };
}
