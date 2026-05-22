import { Hero, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";

interface Props {
  locale: Locale;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export default function HomeHero({ locale, title, subtitle, ctaLabel }: Props) {
  return (
    <Hero
      eyebrow="ExpertCont"
      title={title}
      subtitle={subtitle}
      cta={
        <Button href={sectionUrl("contact", locale)} variant="primary">
          {ctaLabel}
        </Button>
      }
    />
  );
}
