import { getCollection } from "astro:content";
import { detailUrl, homeUrl, type Locale } from "@expertcont/i18n";

const LABELS: Record<
  Locale,
  {
    searchPlaceholder: string;
    readTimeLabel: string;
    featuredLabel: string;
    readLabel: string;
    noResultsLabel: string;
    paginationPrev: string;
    paginationNext: string;
    pageEyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    pageBreadcrumbHome: string;
    pageBreadcrumbCurrent: string;
    categories: string[];
  }
> = {
  ro: {
    searchPlaceholder: "Caută un articol...",
    readTimeLabel: "min citire",
    featuredLabel: "Featured",
    readLabel: "Citește articolul",
    noResultsLabel: "Nu am găsit articole pentru filtrele selectate.",
    paginationPrev: "Anterior",
    paginationNext: "Următor",
    pageEyebrow: "Blog",
    pageTitle: "Toate articolele",
    pageSubtitle:
      "Actualități fiscale, ghiduri practice și sfaturi pentru antreprenori din Republica Moldova.",
    pageBreadcrumbHome: "Acasă",
    pageBreadcrumbCurrent: "Blog",
    categories: ["Toate"],
  },
  ru: {
    searchPlaceholder: "Найти статью...",
    readTimeLabel: "мин чтения",
    featuredLabel: "Избранное",
    readLabel: "Читать статью",
    noResultsLabel: "Статей по выбранным фильтрам не найдено.",
    paginationPrev: "Назад",
    paginationNext: "Вперёд",
    pageEyebrow: "Блог",
    pageTitle: "Все статьи",
    pageSubtitle:
      "Налоговые новости, практические руководства и советы для предпринимателей Молдовы.",
    pageBreadcrumbHome: "Главная",
    pageBreadcrumbCurrent: "Блог",
    categories: ["Все"],
  },
  en: {
    searchPlaceholder: "Search articles...",
    readTimeLabel: "min read",
    featuredLabel: "Featured",
    readLabel: "Read article",
    noResultsLabel: "No articles found for the selected filters.",
    paginationPrev: "Previous",
    paginationNext: "Next",
    pageEyebrow: "Blog",
    pageTitle: "All articles",
    pageSubtitle:
      "Tax updates, practical guides and tips for entrepreneurs in the Republic of Moldova.",
    pageBreadcrumbHome: "Home",
    pageBreadcrumbCurrent: "Blog",
    categories: ["All"],
  },
};

export async function blogIndexProps(locale: Locale) {
  const metas = await getCollection("blog-meta");
  const labels = LABELS[locale];

  const posts = metas.map((entry) => {
    const m = entry.data;
    return {
      slug: m.slugs[locale],
      href: detailUrl("blog", m, locale),
      category: m.category[locale],
      title: m.titles[locale],
      excerpt: m.summaries[locale],
      date: m.publishedAt,
      readTime: m.readTime,
      featured: m.featured,
      author: m.author ?? "",
      cover: m.cover,
    };
  });

  const categorySet = new Set<string>([labels.categories[0] ?? "All"]);
  for (const p of posts) categorySet.add(p.category);

  return {
    posts,
    categories: [...categorySet],
    searchPlaceholder: labels.searchPlaceholder,
    readTimeLabel: labels.readTimeLabel,
    featuredLabel: labels.featuredLabel,
    readLabel: labels.readLabel,
    noResultsLabel: labels.noResultsLabel,
    paginationPrev: labels.paginationPrev,
    paginationNext: labels.paginationNext,
    pageEyebrow: labels.pageEyebrow,
    pageTitle: labels.pageTitle,
    pageSubtitle: labels.pageSubtitle,
    pageBreadcrumbHome: labels.pageBreadcrumbHome,
    pageBreadcrumbCurrent: labels.pageBreadcrumbCurrent,
    homeHref: homeUrl(locale),
  };
}
