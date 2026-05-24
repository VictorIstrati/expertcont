import { Container, SectionHeader } from "@expertcont/ui";
import type { PricingIntroConfig } from "./types";

interface Props {
  intro: PricingIntroConfig;
}

export function PricingIntro({ intro }: Props) {
  return (
    <section className="section">
      <Container>
        <SectionHeader
          align="center"
          eyebrow={intro.eyebrow}
          title={intro.title}
          maxWidth={760}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {intro.paragraphs.map((p, i) => (
            <div key={i} className="card p-6">
              <h3 className="text-lg mb-3">{p.heading}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-0">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
