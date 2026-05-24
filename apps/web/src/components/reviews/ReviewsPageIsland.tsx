import { TestimonialCard } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface Review {
  author: string;
  authorCompany: string;
  rating: number;
  body: string;
}

interface Props {
  locale: Locale;
  reviews: Review[];
  ctaTitle: string;
  ctaBtn: string;
  ctaNote: string;
  filterChips: string[];
  ratingSummaryLabel: string;
}

const DIST: { pct: number; stars: number }[] = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export default function ReviewsPageIsland({
  locale: _locale,
  reviews,
  ctaTitle,
  ctaBtn,
  ctaNote,
  filterChips,
  ratingSummaryLabel,
}: Props) {
  return (
    <div>
      {/* Rating summary card */}
      <div className="card mb-12 grid grid-cols-1 items-center gap-12 px-10 py-8 md:grid-cols-[auto_1fr]">
        {/* Score block */}
        <div className="text-center">
          <div className="mb-2 text-[64px] font-extrabold leading-none tracking-tighter">4.9</div>
          <div className="mb-2 flex justify-center gap-1 text-2xl text-[#F59E0B]">{"★★★★★"}</div>
          <div className="text-sm text-text-secondary">{ratingSummaryLabel}</div>
        </div>

        {/* Distribution bars */}
        <div className="flex flex-col gap-2">
          {DIST.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="w-4 text-right text-sm text-text-secondary">{d.stars}</span>
              <span className="text-sm text-[#F59E0B]">★</span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-border">
                <div
                  className={`h-full rounded ${d.stars >= 4 ? "bg-primary" : "bg-text-secondary"}`}
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-8 text-xs text-text-secondary">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filterChips.map((c, i) => (
          <span
            key={c}
            className={`cursor-default rounded-pill border px-4 py-2 text-sm font-semibold ${
              i === 0
                ? "border-primary bg-primary text-white"
                : "border-border bg-bg-card text-text-primary"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Reviews grid */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <TestimonialCard
            key={`${r.author}-${r.body.slice(0, 16)}`}
            author={r.author}
            authorCompany={r.authorCompany}
            rating={r.rating}
            body={r.body}
          />
        ))}
      </div>

      {/* Leave a review CTA */}
      <div className="rounded-lg bg-primary dark:bg-primary-deep p-10 text-center text-white">
        <h3 className="mb-3 text-2xl text-white">{ctaTitle}</h3>
        <button
          className="btn btn-primary mb-3 inline-flex items-center gap-2"
          onClick={() => openModal("review")}
        >
          {ctaBtn}
        </button>
        <p className="m-0 text-sm text-white/65">{ctaNote}</p>
      </div>
    </div>
  );
}
