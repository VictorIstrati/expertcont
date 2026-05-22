import { Accordion } from "@expertcont/ui";
import type { AccordionItem } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";
import { ServiceWhatsIncluded } from "./ServiceWhatsIncluded";
import { ServiceMiniProcess } from "./ServiceMiniProcess";

interface IncludedItem {
  icon: IconName;
  title: string;
  text: string;
}

interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

interface ServiceDetailBodyProps {
  includedHeading: string;
  includedItems: IncludedItem[];
  processHeading: string;
  processSteps: ProcessStep[];
  faqHeading: string;
  faqItems: AccordionItem[];
}

export function ServiceDetailBody({
  includedHeading,
  includedItems,
  processHeading,
  processSteps,
  faqHeading,
  faqItems,
}: ServiceDetailBodyProps) {
  return (
    <>
      <ServiceWhatsIncluded items={includedItems} heading={includedHeading} />
      <ServiceMiniProcess steps={processSteps} heading={processHeading} />
      <h2 className="text-4xl mb-6">{faqHeading}</h2>
      <Accordion items={faqItems} />
    </>
  );
}
