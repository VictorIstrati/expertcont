import type { ReactNode } from "react";
import { ImagePlaceholder, SectionHeader } from "@expertcont/ui";
import { sectionUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";

interface RelatedPost {
  slug: string;
  href: string;
  category: string;
  title: string;
  date: string;
  readTime: number;
}

interface Props {
  locale: Locale;
  category: string;
  title: string;
  date: string;
  readTime: number;
  readTimeLabel: string;
  relatedPosts: RelatedPost[];
  relatedTitle: string;
  relatedEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
  backLabel: string;
  blogHref: string;
  tocTitle: string;
  content: ReactNode;
}

export default function BlogDetailIsland({
  locale,
  category,
  title,
  date,
  readTime,
  readTimeLabel,
  relatedPosts,
  relatedTitle,
  relatedEyebrow,
  ctaTitle,
  ctaBody,
  ctaBtn,
  backLabel,
  blogHref,
  tocTitle,
  content,
}: Props) {
  return (
    <div>
      {/* Article header */}
      <div className="pt-16 pb-8">
        <a
          href={blogHref}
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary no-underline"
        >
          ← {backLabel}
        </a>
        <div className="mb-5 flex gap-2">
          <span className="pill">{category}</span>
        </div>
        <h1 className="mb-6 max-w-3xl text-[clamp(30px,4vw,48px)] leading-tight">{title}</h1>
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <span>{date}</span>
          <span>·</span>
          <span>
            {readTime} {readTimeLabel}
          </span>
        </div>
        {/* Cover image */}
        <ImagePlaceholder ratio="21/9" label="Article cover" />
      </div>

      {/* Main content + sidebar */}
      <div className="blog-detail-layout mt-12 grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
        {/* Main article body */}
        <article className="text-lg leading-relaxed text-text-primary">
          {content}

          {/* Inline CTA */}
          <div className="mt-12 rounded-lg bg-primary dark:bg-primary-deep p-8 text-white">
            <h3 className="mb-3 text-white">{ctaTitle}</h3>
            <p className="mb-5 text-white/80">{ctaBody}</p>
            <a
              href={sectionUrl("contact", locale)}
              className="btn btn-primary inline-flex items-center gap-2 no-underline"
            >
              {ctaBtn}
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden flex-col gap-6 lg:flex">
          {/* Table of contents stub */}
          <div className="card sticky top-nav-h p-6">
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
              {tocTitle}
            </div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`flex items-center gap-3 py-2 text-sm ${
                  n < 3 ? "border-b border-border" : ""
                } ${n === 1 ? "text-primary" : "text-text-secondary"}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    n === 1
                      ? "bg-primary text-white"
                      : "bg-border text-text-secondary"
                  }`}
                >
                  {n}
                </span>
                <span className="h-3 flex-1 rounded bg-border opacity-60" />
              </div>
            ))}
          </div>

          {/* Related mini-cards */}
          {relatedPosts.length > 0 && (
            <div className="card p-6">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
                {relatedEyebrow}
              </div>
              <div className="flex flex-col gap-4">
                {relatedPosts.map((p) => (
                  <a key={p.slug} href={p.href} className="block no-underline">
                    <div className="card-flat cursor-pointer p-4">
                      <span className="pill pill-soft mb-2 inline-block">{p.category}</span>
                      <div className="mt-1 mb-2 text-sm font-semibold leading-snug text-text-primary">
                        {p.title}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {p.date} · {p.readTime} min
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Related posts section */}
      <div className="mt-20 border-t border-border pt-16">
        <SectionHeader eyebrow={relatedEyebrow} title={relatedTitle} />
        <div className="related-posts-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((p) => (
            <article key={p.slug}>
              <a
                href={p.href}
                className="card card-hover block overflow-hidden p-0 no-underline"
              >
                <ImagePlaceholder ratio="16/10" label={p.category} style={{ borderRadius: 0 }} />
                <div className="p-6 max-sm:px-0">
                  <span className="pill pill-soft mb-3 inline-block">{p.category}</span>
                  <h3 className="mt-2 mb-3 text-lg leading-snug text-text-primary">
                    {p.title}
                  </h3>
                  <div className="text-xs text-text-secondary">
                    {p.date} · {p.readTime} min
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
