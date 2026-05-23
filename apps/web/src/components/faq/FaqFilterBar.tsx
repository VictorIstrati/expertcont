import { Icon } from "@expertcont/ui";

interface Props {
  searchPlaceholder: string;
  query: string;
  onQueryChange: (q: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  sticky: boolean;
}

export function FaqFilterBar({
  searchPlaceholder,
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
  sticky,
}: Props) {
  return (
    <div
      className={`mb-10 rounded-xl bg-bg-section-alt px-5 py-3 ${
        sticky ? "sticky top-nav-h z-20" : ""
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
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:bg-bg-card hover:text-text-primary"
            aria-label="Clear search"
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>
      <div className="mt-2 flex gap-1 overflow-x-auto border-t border-border pt-2 md:flex-wrap md:overflow-visible">
        {categories.map((c) => {
          const active = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
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
}
