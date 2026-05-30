import { getCollection } from "astro:content";
import {
  homeUrl,
  sectionUrl,
  detailUrl,
  type Locale,
  type ContentMeta,
  type SectionKey,
} from "@expertcont/i18n";

export interface SitemapLink {
  href: string;
  label: string;
}

export interface SitemapGroup {
  heading: string;
  links: SitemapLink[];
}

const sectionLabels: Record<Exclude<SectionKey, "sitemap">, Record<Locale, string>> = {
  solutions: { ro: "Soluții", ru: "Решения", en: "Solutions" },
  services: { ro: "Servicii", ru: "Услуги", en: "Services" },
  industries: { ro: "Domenii", ru: "Отрасли", en: "Industries" },
  pricing: { ro: "Prețuri", ru: "Цены", en: "Pricing" },
  contact: { ro: "Contact", ru: "Контакты", en: "Contact" },
  about: { ro: "Despre noi", ru: "О нас", en: "About us" },
  faq: { ro: "Întrebări frecvente", ru: "Вопросы и ответы", en: "FAQ" },
  reviews: { ro: "Recenzii", ru: "Отзывы", en: "Reviews" },
  blog: { ro: "Blog", ru: "Блог", en: "Blog" },
  guides: { ro: "Ghiduri", ru: "Руководства", en: "Guides" },
  privacy: { ro: "Confidențialitate", ru: "Конфиденциальность", en: "Privacy" },
  terms: { ro: "Termeni și condiții", ru: "Условия", en: "Terms" },
  cookies: { ro: "Politica cookies", ru: "Политика cookies", en: "Cookies" },
  partners: { ro: "Parteneri", ru: "Партнёры", en: "Partners" },
  careers: { ro: "Cariere", ru: "Карьера", en: "Careers" },
};

const homeLabel: Record<Locale, string> = {
  ro: "Acasă",
  ru: "Главная",
  en: "Home",
};

const groupHeadings: Record<"main" | "company" | "content" | "legal", Record<Locale, string>> = {
  main: { ro: "Pagini principale", ru: "Основные страницы", en: "Main pages" },
  company: { ro: "Companie", ru: "Компания", en: "Company" },
  content: { ro: "Conținut", ru: "Контент", en: "Content" },
  legal: { ro: "Documente legale", ru: "Юридические документы", en: "Legal" },
};

type LinkableSection = Exclude<SectionKey, "sitemap">;
const mainSections: LinkableSection[] = [
  "solutions",
  "services",
  "industries",
  "pricing",
  "contact",
];
const companySections: LinkableSection[] = ["about", "faq", "reviews", "partners", "careers"];
const legalSections: LinkableSection[] = ["privacy", "terms", "cookies"];

function sectionLink(section: Exclude<SectionKey, "sitemap">, locale: Locale): SitemapLink {
  return { href: sectionUrl(section, locale), label: sectionLabels[section][locale] };
}

export async function buildSitemapGroups(locale: Locale): Promise<SitemapGroup[]> {
  const [servicesMeta, blogMeta, guidesMeta] = await Promise.all([
    getCollection("services-meta"),
    getCollection("blog-meta"),
    getCollection("guides-meta"),
  ]);

  const services = servicesMeta.map((e) => e.data as ContentMeta);
  const blog = blogMeta.map((e) => e.data as ContentMeta);
  const guides = guidesMeta.map((e) => e.data as ContentMeta);

  const main: SitemapLink[] = [
    { href: homeUrl(locale), label: homeLabel[locale] },
    ...mainSections.map((s) => sectionLink(s, locale)),
  ];

  const serviceLinks: SitemapLink[] = services.map((m) => ({
    href: detailUrl("services", m, locale),
    label: m.titles[locale],
  }));

  const blogLinks: SitemapLink[] = blog.map((m) => ({
    href: detailUrl("blog", m, locale),
    label: m.titles[locale],
  }));

  const guideLinks: SitemapLink[] = guides.map((m) => ({
    href: detailUrl("guides", m, locale),
    label: m.titles[locale],
  }));

  return [
    { heading: groupHeadings.main[locale], links: main },
    {
      heading: sectionLabels.services[locale],
      links: [sectionLink("services", locale), ...serviceLinks],
    },
    {
      heading: groupHeadings.company[locale],
      links: companySections.map((s) => sectionLink(s, locale)),
    },
    {
      heading: sectionLabels.blog[locale],
      links: [sectionLink("blog", locale), ...blogLinks],
    },
    {
      heading: sectionLabels.guides[locale],
      links: [sectionLink("guides", locale), ...guideLinks],
    },
    {
      heading: groupHeadings.legal[locale],
      links: legalSections.map((s) => sectionLink(s, locale)),
    },
  ];
}

export const sitemapPageMeta: Record<
  Locale,
  { title: string; description: string; heading: string; lead: string }
> = {
  ro: {
    title: "Harta site-ului — ExpertCont",
    description:
      "Toate paginile site-ului ExpertCont: servicii de contabilitate, prețuri, blog, ghiduri și documente legale.",
    heading: "Harta site-ului",
    lead: "Navighează rapid la orice pagină a ExpertCont — servicii, articole, ghiduri și informații despre companie.",
  },
  ru: {
    title: "Карта сайта — ExpertCont",
    description:
      "Все страницы сайта ExpertCont: бухгалтерские услуги, цены, блог, руководства и юридические документы.",
    heading: "Карта сайта",
    lead: "Быстрая навигация по всем страницам ExpertCont — услуги, статьи, руководства и информация о компании.",
  },
  en: {
    title: "Sitemap — ExpertCont",
    description:
      "All ExpertCont pages: accounting services, pricing, blog posts, guides, and legal documents.",
    heading: "Sitemap",
    lead: "Browse every page on ExpertCont — services, articles, guides, and company information.",
  },
};
