import { Button } from "@expertcont/ui";
import { openModal } from "../../lib/modalBus";

interface Props {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  phone: string;
}

export function FaqFinalCta({ eyebrow, title, subtitle, primary, phone }: Props) {
  return (
    <section className="relative overflow-hidden bg-primary dark:bg-primary-deep px-6 py-20 text-center">
      <div className="pointer-events-none absolute -top-24 -right-12 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
      <div className="pointer-events-none absolute -bottom-36 -left-24 h-[400px] w-[400px] rounded-full border border-white/5" />
      <div className="relative mx-auto max-w-2xl">
        <div className="mb-5 text-sm font-bold uppercase tracking-widest text-accent">
          {eyebrow}
        </div>
        <h2 className="mb-4 text-white">{title}</h2>
        <p className="mb-8 text-lg text-white/85">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" icon="calendar" onClick={() => openModal("booking")}>
            {primary}
          </Button>
          <Button
            href={`tel:${phone.replace(/\s/g, "")}`}
            variant="ghost"
            size="lg"
            icon="phone"
            className="border border-white/70 text-white hover:bg-white/10"
          >
            {phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
