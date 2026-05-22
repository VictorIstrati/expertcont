import { Button } from "@expertcont/ui";
import { openModal } from "../../lib/modalBus";

interface ServiceCTAStripProps {
  locale: string;
  contactHref: string;
}

const copy = {
  ro: {
    question: "Nu ești sigur ce serviciu ai nevoie?",
    sub: "Echipa noastră te ajută să identifici soluția potrivită pentru afacerea ta.",
    cta: "Consultație gratuită",
  },
  ru: {
    question: "Не уверены, какая услуга вам нужна?",
    sub: "Наша команда поможет вам подобрать оптимальное решение для вашего бизнеса.",
    cta: "Бесплатная консультация",
  },
  en: {
    question: "Not sure which service you need?",
    sub: "Our team will help you identify the right solution for your business.",
    cta: "Free consultation",
  },
};

export function ServiceCTAStrip({ locale, contactHref: _contactHref }: ServiceCTAStripProps) {
  const t = copy[locale as keyof typeof copy] ?? copy.ro;
  return (
    <div className="bg-primary-deep rounded-lg px-10 py-12 flex items-center justify-between gap-8 flex-wrap relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-[200px] h-[200px] border border-[rgba(223,183,65,0.2)] rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-[140px] h-[140px] border border-white/10 rounded-full" />
      <div className="relative">
        <h3 className="text-white text-2xl mb-2">{t.question}</h3>
        <p className="text-white/75 text-base m-0">{t.sub}</p>
      </div>
      <div className="relative shrink-0">
        <Button variant="primary" icon="calendar" onClick={() => openModal("booking")}>
          {t.cta}
        </Button>
      </div>
    </div>
  );
}
