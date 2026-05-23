import { Button, Container } from "@expertcont/ui";
import { openModal } from "../../lib/modalBus";

interface Props {
  title: string;
  subtitle: string;
  button: string;
  /** If set, render the button as an anchor link. Otherwise open the booking modal. */
  href?: string;
}

export function PricingCta({ title, subtitle, button, href }: Props) {
  return (
    <section className="section section-alt border-t border-border">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="mb-3">{title}</h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">{subtitle}</p>
          {href ? (
            <Button variant="primary" size="lg" iconRight="arrow-right" href={href}>
              {button}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              iconRight="arrow-right"
              onClick={() => openModal("booking")}
            >
              {button}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
