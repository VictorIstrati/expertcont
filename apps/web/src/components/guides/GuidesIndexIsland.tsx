import { Button, Container, ImagePlaceholder, PageHeader, Section } from "@expertcont/ui";
import { sectionUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";

interface Guide {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: number;
  featured?: boolean;
}

interface Props {
  locale: Locale;
  guides: Guide[];
  categories: string[];
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
  homeHref: string;
}

export default function GuidesIndexIsland({
  locale,
  guides,
  categories: _categories,
  readTimeLabel,
  readLabel,
  featuredLabel,
  noResultsLabel,
  ctaTitle,
  ctaBody,
  ctaBtn,
  pageEyebrow,
  pageTitle,
  pageSubtitle,
  pageBreadcrumbHome,
  pageBreadcrumbCurrent,
  homeHref,
}: Props) {
  const featured = guides.find((g) => g.featured);
  const rest = guides.filter((g) => !g.featured);

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
          {featured && (
            <a
              href={featured.href}
              className="card card-hover mb-10 grid grid-cols-1 overflow-hidden p-0 no-underline md:grid-cols-[1.2fr_1fr]"
            >
              <ImagePlaceholder
                ratio="16/10"
                label={`Featured · ${featured.category}`}
                style={{ borderRadius: 0 }}
              />
              <div className="flex flex-col justify-center p-10 max-sm:p-6">
                <div className="mb-4 flex gap-2">
                  <span className="pill pill-accent">★ {featuredLabel}</span>
                  <span className="pill">{featured.category}</span>
                </div>
                <h2 className="mb-4 text-3xl leading-tight">{featured.title}</h2>
                <p className="mb-6 text-base leading-relaxed text-text-secondary">
                  {featured.excerpt}
                </p>
                <div className="mb-5 text-sm text-text-secondary">
                  {featured.readTime} {readTimeLabel}
                </div>
                <span className="btn btn-primary inline-flex w-fit items-center gap-2">
                  {readLabel}
                </span>
              </div>
            </a>
          )}

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((g) => (
                <article key={g.slug}>
                  <a
                    href={g.href}
                    className="card card-hover block overflow-hidden p-0 no-underline"
                  >
                    <ImagePlaceholder
                      ratio="16/10"
                      label={g.category}
                      style={{ borderRadius: 0 }}
                    />
                    <div className="p-6">
                      <span className="pill pill-soft mb-3 inline-block">{g.category}</span>
                      <h3 className="mt-2 mb-3 text-lg leading-snug">{g.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {g.excerpt}
                      </p>
                      <div className="text-xs text-text-secondary">
                        {g.readTime} {readTimeLabel}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : !featured ? (
            <div className="py-16 text-center text-text-secondary">{noResultsLabel}</div>
          ) : null}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-lg bg-primary dark:bg-primary-deep p-10 text-white">
            <div>
              <h3 className="mb-2 text-white">{ctaTitle}</h3>
              <p className="m-0 text-base text-white/85">{ctaBody}</p>
            </div>
            <Button href={sectionUrl("contact", locale)} variant="primary" className="shrink-0">
              {ctaBtn}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
