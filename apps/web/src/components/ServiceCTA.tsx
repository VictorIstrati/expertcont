import { Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";

interface Props {
  locale: Locale;
  heading: string;
  body: string;
  ctaLabel: string;
}

export default function ServiceCTA({ locale, heading, body, ctaLabel }: Props) {
  return (
    <div className="mt-12 p-6 bg-bg-section rounded-lg flex items-center justify-between gap-5 flex-wrap">
      <div>
        <h3 className="m-0 mb-2 text-xl">{heading}</h3>
        <p className="m-0 text-text-secondary">{body}</p>
      </div>
      <Button href={sectionUrl("contact", locale)} variant="primary">
        {ctaLabel}
      </Button>
    </div>
  );
}
