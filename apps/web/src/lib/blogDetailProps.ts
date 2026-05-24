import { getCollection } from "astro:content";
import { detailUrl, sectionUrl, type Locale, type ContentMeta } from "@expertcont/i18n";

export interface BlogMeta extends ContentMeta {
  publishedAt: string;
  category: { ro: string; ru: string; en: string };
  readTime: number;
  featured?: boolean;
  author?: string;
  cover?: string;
}

interface DetailLabels {
  backToAll: string;
  readTimeLabel: string;
  tocLabel: string;
  similarLabel: string;
  continueReadingEyebrow: string;
  continueReadingTitle: string;
  inlineCtaTitle: string;
  inlineCtaSubtitle: string;
  inlineCtaButton: string;
}

const LABELS: Record<Locale, DetailLabels> = {
  ro: {
    backToAll: "← Toate articolele",
    readTimeLabel: "min citire",
    tocLabel: "Cuprins",
    similarLabel: "Articole similare",
    continueReadingEyebrow: "Continuă lectura",
    continueReadingTitle: "Articole similare",
    inlineCtaTitle: "Ai întrebări despre cum te afectează aceste modificări?",
    inlineCtaSubtitle:
      "Programează o consultație gratuită de 30 de minute cu un consultant fiscal ExpertCont.",
    inlineCtaButton: "Programează consultație",
  },
  ru: {
    backToAll: "← Все статьи",
    readTimeLabel: "мин чтения",
    tocLabel: "Содержание",
    similarLabel: "Похожие статьи",
    continueReadingEyebrow: "Продолжить чтение",
    continueReadingTitle: "Похожие статьи",
    inlineCtaTitle: "Есть вопросы о том, как эти изменения повлияют на вас?",
    inlineCtaSubtitle:
      "Запишитесь на бесплатную 30-минутную консультацию с налоговым консультантом ExpertCont.",
    inlineCtaButton: "Записаться на консультацию",
  },
  en: {
    backToAll: "← All articles",
    readTimeLabel: "min read",
    tocLabel: "Contents",
    similarLabel: "Related articles",
    continueReadingEyebrow: "Continue reading",
    continueReadingTitle: "Related articles",
    inlineCtaTitle: "Questions about how these changes affect you?",
    inlineCtaSubtitle: "Book a free 30-minute consultation with an ExpertCont tax advisor.",
    inlineCtaButton: "Book a consultation",
  },
};

export interface RelatedPost {
  href: string;
  category: string;
  title: string;
  date: string;
  readTime: number;
  cover?: string;
}

export async function blogDetailProps(meta: BlogMeta, locale: Locale) {
  const all = await getCollection("blog-meta");
  const related: RelatedPost[] = all
    .filter((e) => e.data.id !== meta.id)
    .slice(0, 3)
    .map((e) => ({
      href: detailUrl("blog", e.data, locale),
      category: e.data.category[locale],
      title: e.data.titles[locale],
      date: e.data.publishedAt,
      readTime: e.data.readTime,
      cover: e.data.cover,
    }));

  return {
    labels: LABELS[locale],
    related,
    indexHref: sectionUrl("blog", locale),
    contactHref: sectionUrl("contact", locale),
  };
}
