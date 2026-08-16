import { Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import { ukraineCatalogue, ukraineItemKey, UKRAINE_BOOKING_SLUG } from "./ukraineCatalogue";

interface Props {
  locale: Locale;
}

const HEADING: Record<Locale, string> = {
  ro: "Ce putem rezolva",
  ru: "Что мы решаем",
  en: "What we can handle",
};

const HINT: Record<Locale, string> = {
  ro: "Alegeți situația dumneavoastră — deschidem formularul de programare cu ea deja selectată.",
  ru: "Выберите вашу ситуацию — откроем форму записи с уже выбранным вопросом.",
  en: "Pick your situation — the booking form opens with it already selected.",
};

/** Per-item call to action. Always visible: a hover-only affordance leaves the
 * rows looking like static bullets on touch devices, where there is no hover. */
const ITEM_CTA: Record<Locale, string> = {
  ro: "Programează",
  ru: "Записаться",
  en: "Book this",
};

/**
 * The Ukrainian service catalogue, rendered from the same data the booking
 * modal's picker uses. Every item is a button: choosing one opens the booking
 * modal pre-selected with that exact item, so the visitor never has to restate
 * what they just clicked.
 */
export function UkraineCatalogueSection({ locale }: Props) {
  return (
    <section className="mb-14">
      <h2 className="text-4xl mb-3">{HEADING[locale]}</h2>
      <p className="text-base text-text-secondary mb-10">{HINT[locale]}</p>

      <div className="flex flex-col gap-12">
        {ukraineCatalogue.map((category) => (
          <div key={category.id}>
            <div className="flex items-start gap-4 mb-4">
              <span className="w-11 h-11 rounded-md bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <Icon name={category.icon} size={22} />
              </span>
              <div>
                <h3 className="text-2xl mb-2">{category.titles[locale]}</h3>
                <p className="text-base text-text-secondary m-0 leading-relaxed">
                  {category.intros[locale]}
                </p>
              </div>
            </div>

            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {category.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      openModal("booking", {
                        service: UKRAINE_BOOKING_SLUG,
                        subservice: ukraineItemKey(category.id, item.id),
                      })
                    }
                    className="group w-full text-left flex flex-wrap items-start gap-x-3 gap-y-3 rounded-sm border-[1.5px] border-border bg-transparent p-4 cursor-pointer transition-all duration-150 hover:border-primary hover:bg-primary-50"
                  >
                    <span className="text-accent shrink-0 mt-1 transition-colors group-hover:text-primary">
                      <Icon name="check" size={15} stroke={2.5} />
                    </span>
                    <span className="text-base leading-relaxed flex-1 min-w-[12rem]">
                      {item.labels[locale]}
                    </span>
                    <span className="ml-auto shrink-0 self-center inline-flex items-center gap-1.5 rounded-xs border border-primary/40 bg-primary-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      {ITEM_CTA[locale]}
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
