import { useEffect, useState } from "react";
import { Icon, type IconName } from "@expertcont/ui";

import type { BookingData, Strings } from "./types";
import {
  ukraineCatalogue,
  ukraineItemKey,
  ukraineItemLabel,
  ukraineOtherLabels,
  ukraineOtherPlaceholders,
  UKRAINE_BOOKING_SLUG,
  UKRAINE_OTHER_ID,
  type PageLocale,
} from "../../service/ukraineCatalogue";

interface Props {
  data: BookingData;
  onChange: (next: BookingData) => void;
  t: Strings;
  locale: PageLocale;
}

const SUB_HEADING: Record<PageLocale, string> = {
  ro: "Cu ce vă putem ajuta?",
  ru: "С чем вам помочь?",
  en: "What do you need help with?",
  uk: "З чим вам допомогти?",
};

const SUB_PICK_ITEM: Record<PageLocale, string> = {
  ro: "Alegeți situația concretă",
  ru: "Выберите конкретный случай",
  en: "Choose the specific case",
  uk: "Оберіть конкретний випадок",
};

const BACK_TO_CATEGORIES: Record<PageLocale, string> = {
  ro: "Înapoi la categorii",
  ru: "Назад к категориям",
  en: "Back to categories",
  uk: "Назад до категорій",
};

const OTHER_CATEGORY: Record<PageLocale, string> = {
  ro: "Altceva",
  ru: "Другое",
  en: "Something else",
  uk: "Інше",
};

const CHOSEN_LABEL: Record<PageLocale, string> = {
  ro: "Ați ales",
  ru: "Вы выбрали",
  en: "You selected",
  uk: "Ви обрали",
};

const CHANGE_LABEL: Record<PageLocale, string> = {
  ro: "Schimbă",
  ru: "Изменить",
  en: "Change",
  uk: "Змінити",
};

/** Category a stored `<categoryId>:<itemId>` key (or "other") belongs to. */
function categoryIdOf(subservice: string | null): string | null {
  if (!subservice) return null;
  if (subservice === UKRAINE_OTHER_ID) return UKRAINE_OTHER_ID;
  return subservice.split(":")[0] ?? null;
}

export function ServiceStep({ data, onChange, t, locale }: Props) {
  const isUkraine = data.service === UKRAINE_BOOKING_SLUG;

  // Which category is expanded. Local UI state, deliberately separate from
  // `data.subservice`: opening a category must not select an item on the
  // visitor's behalf. It only follows the selection when one arrives from
  // outside — e.g. the visitor clicked an item in the on-page catalogue.
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(() =>
    categoryIdOf(data.subservice),
  );

  useEffect(() => {
    const fromSelection = categoryIdOf(data.subservice);
    if (fromSelection) setOpenCategoryId(fromSelection);
  }, [data.subservice]);

  const activeCategory = ukraineCatalogue.find((c) => c.id === openCategoryId) ?? null;
  const activeCategoryId = openCategoryId;

  // What the visitor has actually chosen, spelled out. Without this the only
  // signal is a highlighted row further down the list — easy to miss when the
  // selection arrived from the page catalogue rather than from a click here.
  const chosenLabel = !isUkraine
    ? null
    : data.subservice === UKRAINE_OTHER_ID
      ? data.subserviceOther.trim() || ukraineOtherLabels[locale]
      : data.subservice
        ? (ukraineItemLabel(data.subservice, locale) ?? null)
        : null;

  return (
    <div className="flex flex-col gap-8">
      {chosenLabel && (
        <div className="flex items-start gap-3 rounded-sm border-[1.5px] border-primary bg-primary-50 p-4">
          <span className="shrink-0 mt-0.5 text-primary">
            <Icon name="check-circle" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {CHOSEN_LABEL[locale]}
            </div>
            <p className="m-0 text-sm leading-relaxed">{chosenLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpenCategoryId(null);
              onChange({ ...data, subservice: null, subserviceOther: "" });
            }}
            className="shrink-0 text-sm text-primary underline cursor-pointer bg-transparent border-0 p-0"
          >
            {CHANGE_LABEL[locale]}
          </button>
        </div>
      )}

      <div>
        <h4 className="mb-4">{t.serviceLabel}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.services.map((s) => {
            const active = data.service === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => {
                  setOpenCategoryId(null);
                  onChange({ ...data, service: s.slug, subservice: null, subserviceOther: "" });
                }}
                className={`p-4 text-left flex items-center gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                  active ? "border-primary bg-primary-50" : "border-border bg-transparent"
                }`}
              >
                <span className="w-9 h-9 rounded-xs bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
                  <Icon name={s.icon as IconName} size={16} />
                </span>
                <span className="text-sm font-semibold">{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isUkraine && !activeCategoryId && (
        <div>
          <h4 className="mb-4">{SUB_HEADING[locale]}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ukraineCatalogue.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setOpenCategoryId(category.id)}
                className="p-4 text-left flex items-center gap-3 border-[1.5px] border-border bg-transparent rounded-sm cursor-pointer transition-all duration-150 hover:border-primary hover:bg-primary-50"
              >
                <span className="w-9 h-9 rounded-xs bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
                  <Icon name={category.icon} size={16} />
                </span>
                <span className="text-sm font-semibold">{category.shortTitles[locale]}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpenCategoryId(UKRAINE_OTHER_ID);
                onChange({ ...data, subservice: UKRAINE_OTHER_ID });
              }}
              className="p-4 text-left flex items-center gap-3 border-[1.5px] border-border bg-transparent rounded-sm cursor-pointer transition-all duration-150 hover:border-primary hover:bg-primary-50"
            >
              <span className="w-9 h-9 rounded-xs bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
                <Icon name="plus" size={16} />
              </span>
              <span className="text-sm font-semibold">{OTHER_CATEGORY[locale]}</span>
            </button>
          </div>
        </div>
      )}

      {isUkraine && activeCategoryId && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h4 className="m-0">
              {activeCategory ? activeCategory.shortTitles[locale] : OTHER_CATEGORY[locale]}
            </h4>
            <button
              type="button"
              onClick={() => {
                setOpenCategoryId(null);
                onChange({ ...data, subservice: null, subserviceOther: "" });
              }}
              className="text-sm text-primary underline cursor-pointer bg-transparent border-0 p-0"
            >
              {BACK_TO_CATEGORIES[locale]}
            </button>
          </div>

          {activeCategory && (
            <>
              <p className="text-sm text-text-secondary mb-3">{SUB_PICK_ITEM[locale]}</p>
              <div className="flex flex-col gap-2">
                {activeCategory.items.map((item) => {
                  const key = ukraineItemKey(activeCategory.id, item.id);
                  const active = data.subservice === key;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange({ ...data, subservice: key, subserviceOther: "" })}
                      className={`p-3 text-left flex items-start gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                        active ? "border-primary bg-primary-50" : "border-border bg-transparent"
                      }`}
                    >
                      <span
                        className={`mt-1 shrink-0 ${active ? "text-primary" : "text-text-secondary"}`}
                      >
                        <Icon name={active ? "check-circle" : "chevron-right"} size={15} />
                      </span>
                      <span className="text-sm leading-relaxed">{item.labels[locale]}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...data, subservice: UKRAINE_OTHER_ID, subserviceOther: "" })
                  }
                  className="p-3 text-left flex items-start gap-3 border-[1.5px] border-border bg-transparent rounded-sm cursor-pointer transition-all duration-150 hover:border-primary"
                >
                  <span className="mt-1 shrink-0 text-text-secondary">
                    <Icon name="plus" size={15} />
                  </span>
                  <span className="text-sm leading-relaxed">{ukraineOtherLabels[locale]}</span>
                </button>
              </div>
            </>
          )}

          {data.subservice === UKRAINE_OTHER_ID && (
            <textarea
              value={data.subserviceOther}
              onChange={(e) => onChange({ ...data, subserviceOther: e.target.value })}
              placeholder={ukraineOtherPlaceholders[locale]}
              rows={4}
              className="mt-3 w-full rounded-sm border-[1.5px] border-border bg-transparent p-3 text-sm leading-relaxed"
            />
          )}
        </div>
      )}
    </div>
  );
}
