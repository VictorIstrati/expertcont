import { useState } from "react";
import { Container, ImagePlaceholder, Icon, PageHeader, Section } from "@expertcont/ui";

interface BlogPost {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  featured?: boolean;
  author: string;
  cover?: string;
}

interface Props {
  posts: BlogPost[];
  categories: string[];
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
  homeHref: string;
}

export default function BlogIndexIsland({
  posts,
  categories,
  searchPlaceholder,
  readTimeLabel,
  featuredLabel,
  readLabel,
  noResultsLabel,
  paginationPrev,
  paginationNext,
  pageEyebrow,
  pageTitle,
  pageSubtitle,
  pageBreadcrumbHome,
  pageBreadcrumbCurrent,
  homeHref,
}: Props) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(categories[0] ?? "Toate");

  const filtered = posts.filter((p) => {
    const matchesCat = activeCat === categories[0] || p.category === activeCat;
    const matchesQuery = query === "" || p.title.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => p !== featured);

  const filtersActive = query.trim() !== "" || activeCat !== categories[0];
  const filterBar = (
    <div
      className={`mb-10 rounded-xl bg-bg-section-alt px-5 py-3 ${
        filtersActive ? "sticky top-nav-h z-20" : ""
      }`}
    >
      <div className="relative">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          className="w-full bg-transparent py-2 pl-10 pr-10 text-base text-text-primary placeholder:text-text-secondary focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:bg-bg-card hover:text-text-primary"
            aria-label="Clear search"
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>
      <div className="mt-2 flex gap-1 overflow-x-auto border-t border-border pt-2 md:flex-wrap md:overflow-visible">
        {categories.map((c) => {
          const active = activeCat === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={pageEyebrow}
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={[
          { label: pageBreadcrumbHome, href: homeHref },
          { label: pageBreadcrumbCurrent },
        ]}
      />

      <Section tone="default">
        <Container>
          {filterBar}
          {featured && (
            <a
              href={featured.href}
              className="card card-hover mb-10 grid grid-cols-1 overflow-hidden p-0 no-underline md:grid-cols-[1.2fr_1fr]"
            >
              {featured.cover ? (
                <img
                  src={featured.cover}
                  alt={featured.title}
                  width="1600"
                  height="1000"
                  loading="eager"
                  decoding="async"
                  className="block h-full w-full object-cover aspect-[16/10]"
                />
              ) : (
                <ImagePlaceholder
                  ratio="16/10"
                  label={`Featured · ${featured.category}`}
                  style={{ borderRadius: 0 }}
                />
              )}
              <div className="flex flex-col justify-center p-10 max-sm:p-6">
                <div className="mb-4 flex gap-2">
                  <span className="pill pill-accent">★ {featuredLabel}</span>
                  <span className="pill">{featured.category}</span>
                </div>
                <h2 className="mb-4 text-3xl leading-tight">{featured.title}</h2>
                <p className="mb-6 text-base leading-relaxed text-text-secondary">
                  {featured.excerpt}
                </p>
                <div className="mb-5 flex items-center gap-4 text-sm text-text-secondary">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>
                    {featured.readTime} {readTimeLabel}
                  </span>
                </div>
                <span className="btn btn-primary inline-flex w-fit items-center gap-2">
                  {readLabel}
                </span>
              </div>
            </a>
          )}

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <article key={p.slug}>
                  <a
                    href={p.href}
                    className="card card-hover block overflow-hidden p-0 no-underline"
                  >
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt={p.title}
                        width="1600"
                        height="1000"
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover aspect-[16/10]"
                      />
                    ) : (
                      <ImagePlaceholder
                        ratio="16/10"
                        label={p.category}
                        style={{ borderRadius: 0 }}
                      />
                    )}
                    <div className="p-6">
                      <span className="pill pill-soft mb-3 inline-block">{p.category}</span>
                      <h3 className="mt-2 mb-3 text-lg leading-snug">{p.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {p.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>{p.date}</span>
                        <span>
                          {p.readTime} {readTimeLabel}
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-text-secondary">{noResultsLabel}</div>
          )}

          {filtered.length > 9 && (
            <div className="mt-12 flex items-center justify-center gap-2 text-sm">
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-text-secondary">
                <Icon name="arrow-left" size={14} />
                {paginationPrev}
              </span>
              {[1, 2, 3].map((n) => {
                const isCurrent = n === 1;
                return (
                  <span
                    key={n}
                    className={`flex h-10 w-10 items-center justify-center rounded-sm border font-semibold ${
                      isCurrent
                        ? "cursor-default border-primary bg-primary text-white"
                        : "cursor-pointer border-border text-text-secondary"
                    }`}
                  >
                    {n}
                  </span>
                );
              })}
              <span className="inline-flex cursor-pointer items-center gap-1.5 text-text-secondary">
                {paginationNext}
                <Icon name="arrow-right" size={14} />
              </span>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
