import { getCollection } from "astro:content";
import { detailUrl, sectionUrl, type Locale, type ContentMeta } from "@expertcont/i18n";

export interface GuideMeta extends ContentMeta {
  publishedAt?: string;
  category: { ro: string; ru: string; en: string };
  readTime: number;
  featured?: boolean;
}

interface DetailLabels {
  backToAll: string;
  readTimeLabel: string;
  tocLabel: string;
  similarLabel: string;
  noRelatedFallback: string;
  continueReadingEyebrow: string;
  continueReadingTitle: string;
  inlineCtaTitle: string;
  inlineCtaSubtitle: string;
  inlineCtaButton: string;
}

const LABELS: Record<Locale, DetailLabels> = {
  ro: {
    backToAll: "← Toate ghidurile",
    readTimeLabel: "min citire",
    tocLabel: "Cuprins",
    similarLabel: "Ghiduri similare",
    noRelatedFallback: "Mai multe ghiduri practice vor fi disponibile în curând.",
    continueReadingEyebrow: "Continuă lectura",
    continueReadingTitle: "Articole din blog",
    inlineCtaTitle: "Ai nevoie de ajutor?",
    inlineCtaSubtitle:
      "Programează o consultație gratuită de 30 de minute cu un specialist ExpertCont.",
    inlineCtaButton: "Programează consultație",
  },
  ru: {
    backToAll: "← Все руководства",
    readTimeLabel: "мин чтения",
    tocLabel: "Содержание",
    similarLabel: "Похожие руководства",
    noRelatedFallback: "Скоро будут доступны другие практические руководства.",
    continueReadingEyebrow: "Продолжить чтение",
    continueReadingTitle: "Статьи из блога",
    inlineCtaTitle: "Нужна помощь?",
    inlineCtaSubtitle:
      "Запишитесь на бесплатную 30-минутную консультацию со специалистом ExpertCont.",
    inlineCtaButton: "Записаться на консультацию",
  },
  en: {
    backToAll: "← All guides",
    readTimeLabel: "min read",
    tocLabel: "Contents",
    similarLabel: "Related guides",
    noRelatedFallback: "More practical guides will be available soon.",
    continueReadingEyebrow: "Continue reading",
    continueReadingTitle: "From the blog",
    inlineCtaTitle: "Need help?",
    inlineCtaSubtitle: "Book a free 30-minute consultation with an ExpertCont specialist.",
    inlineCtaButton: "Book a consultation",
  },
};

export interface RelatedItem {
  href: string;
  category: string;
  title: string;
  date: string;
  readTime: number;
}

export async function guidesDetailProps(meta: GuideMeta, locale: Locale) {
  const allGuides = await getCollection("guides-meta");
  const relatedGuides: RelatedItem[] = allGuides
    .filter((e) => e.data.id !== meta.id)
    .slice(0, 3)
    .map((e) => ({
      href: detailUrl("guides", e.data, locale),
      category: e.data.category[locale],
      title: e.data.titles[locale],
      date: e.data.publishedAt ?? "",
      readTime: e.data.readTime,
    }));

  const allBlog = await getCollection("blog-meta");
  const relatedBlog: RelatedItem[] = allBlog.slice(0, 3).map((e) => ({
    href: detailUrl("blog", e.data, locale),
    category: e.data.category[locale],
    title: e.data.titles[locale],
    date: e.data.publishedAt,
    readTime: e.data.readTime,
  }));

  return {
    labels: LABELS[locale],
    relatedGuides,
    relatedBlog,
    indexHref: sectionUrl("guides", locale),
    contactHref: sectionUrl("contact", locale),
  };
}
