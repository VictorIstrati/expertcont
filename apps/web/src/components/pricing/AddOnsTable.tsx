import { Container, SectionHeader } from "@expertcont/ui";
import type { AddOn } from "./types";

interface Props {
  title: string;
  addOns: AddOn[];
}

export function AddOnsTable({ title, addOns }: Props) {
  return (
    <section className="section section-alt">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Servicii suplimentare"
          title={title}
          maxWidth={620}
        />
        <div className="addons-grid grid grid-cols-3 gap-4">
          {addOns.map((a) => (
            <div key={a.name} className="card p-6 flex justify-between items-center gap-4">
              <div className="text-base font-semibold">{a.name}</div>
              <div className="text-sm font-bold text-primary whitespace-nowrap">{a.price}</div>
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .addons-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .addons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
