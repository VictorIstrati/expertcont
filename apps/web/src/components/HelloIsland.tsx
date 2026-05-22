import { Trans } from "@lingui/react/macro";
import { Button, Container, Heading } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";

interface Props {
  locale: "ro" | "ru" | "en";
}

export default function HelloIsland({ locale }: Props) {
  return (
    <I18nRoot locale={locale}>
      <Container as="main" className="py-16">
        <Heading level={1} size="display">
          <Trans>ExpertCont — accounting, legal, and consulting in Moldova</Trans>
        </Heading>
        <p className="text-lg text-text-secondary max-w-2xl">
          <Trans>
            This is the foundation page. Localized routing and full content follow in the next plan.
          </Trans>
        </p>
        <Button variant="primary">
          <Trans>Get in touch</Trans>
        </Button>
      </Container>
    </I18nRoot>
  );
}
