import { Accordion, SectionHeader } from "@expertcont/ui";
import type { AccordionItem } from "@expertcont/ui";

interface Props {
  items: AccordionItem[];
}

export function PricingFaq({ items }: Props) {
  return (
    <section className="section">
      <div className="container-narrow">
        <SectionHeader
          align="center"
          eyebrow="Întrebări frecvente"
          title="Tot ce trebuie să știi despre prețurile noastre"
          maxWidth={640}
        />
        <Accordion items={items} />
      </div>
    </section>
  );
}
