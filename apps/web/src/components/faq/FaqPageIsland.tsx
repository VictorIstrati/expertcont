import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Container, PageHeader, Section } from "@expertcont/ui";
import { I18nRoot, homeUrl, type Locale } from "@expertcont/i18n";
import { FaqFilterBar } from "./FaqFilterBar";
import { FaqGroups } from "./FaqGroups";
import { FaqQuestionForm } from "./FaqQuestionForm";
import { FaqFinalCta } from "./FaqFinalCta";
import type { FaqGroup } from "./types";

interface Props {
  locale: Locale;
  /** Locale-specific Q&A content. */
  groups: FaqGroup[];
  /** Contact phone shown in the question form sidebar. */
  contactPhone: string;
  /** Contact email shown in the question form sidebar. */
  contactEmail: string;
}

function FaqInner({ locale, groups, contactPhone, contactEmail }: Props) {
  const { t } = useLingui();
  const allLabel = t({
    message: `Toate`,
    comment:
      "FAQ category filter — 'All' (shows every category). Feminine plural in RO agreeing with implied 'întrebări'.",
  });
  const categories = [allLabel, ...Array.from(new Set(groups.map((g) => g.cat)))];

  const [activeCat, setActiveCat] = useState(allLabel);
  const [query, setQuery] = useState("");

  const catFiltered = activeCat === allLabel ? groups : groups.filter((g) => g.cat === activeCat);

  const q = query.trim().toLowerCase();
  const visibleGroups = q
    ? catFiltered
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0)
    : catFiltered;

  const filtersActive = query.trim() !== "" || activeCat !== allLabel;

  return (
    <>
      <PageHeader
        eyebrow={t`Bază de cunoștințe`}
        title={t`Întrebări frecvente`}
        subtitle={t`Răspunsuri la întrebările pe care ni le adresează cel mai des clienții noștri.`}
        breadcrumbs={[
          { label: t`Acasă`, href: homeUrl(locale) },
          { label: t`Întrebări frecvente` },
        ]}
      />

      <Section tone="default">
        <Container>
          <div className="max-w-[860px]">
            <FaqFilterBar
              searchPlaceholder={t`Caută o întrebare...`}
              query={query}
              onQueryChange={setQuery}
              categories={categories}
              activeCategory={activeCat}
              onCategoryChange={setActiveCat}
              sticky={filtersActive}
            />
            <FaqGroups
              groups={visibleGroups}
              notFoundLabel={t`Nu am găsit întrebări pentru filtrele selectate.`}
            />
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <FaqQuestionForm
            locale={locale}
            formEyebrow={t`Nu ai găsit răspunsul?`}
            formTitle={t`Pune-ne o întrebare`}
            formBody={t`Răspundem în mai puțin de 4 ore în zile lucrătoare. Întrebările frecvente le adăugăm și aici, ca să ajute mai departe.`}
            formNameLabel={t`Nume`}
            formEmailLabel={t`Email`}
            formSubjectLabel={t({
              message: `Subiect`,
              comment:
                "FAQ 'ask a question' form — field label for the question subject (topic of the question, not 'subject' as in academic discipline).",
            })}
            formQuestionLabel={t`Întrebarea ta`}
            formConsentLabel={t`Sunt de acord cu prelucrarea datelor conform`}
            formConsentLink={t`politicii de confidențialitate`}
            formSubmitLabel={t`Trimite întrebarea`}
            formSendingLabel={t`Se trimite…`}
            formErrorLabel={t`Nu am putut trimite întrebarea. Încearcă din nou.`}
            formSentTitle={t`Întrebarea ta a fost trimisă`}
            formSentBody={t`Vei primi răspuns pe email în maxim 4 ore în zile lucrătoare.`}
            formSentReset={t`Trimite altă întrebare`}
            formContactPhone={contactPhone}
            formContactEmail={contactEmail}
          />
        </Container>
      </Section>

      <FaqFinalCta
        eyebrow={t`Hai să începem`}
        title={t`Hai să discutăm despre afacerea ta`}
        subtitle={t`Programează o consultație gratuită de 30 de minute. Fără obligații, fără surprize.`}
        primary={t`Programează consultație gratuită (30 min)`}
        phone={contactPhone}
      />
    </>
  );
}

export default function FaqPageIsland(props: Props) {
  return (
    <I18nRoot locale={props.locale}>
      <FaqInner {...props} />
    </I18nRoot>
  );
}

export type { Props as FaqPageIslandProps };
