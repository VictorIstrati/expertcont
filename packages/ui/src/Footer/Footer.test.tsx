import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nProvider } from "@lingui/react";
import { i18n, type Locale } from "@expertcont/i18n";
import { Footer, type FooterProps } from "./Footer";

function renderWithI18n(ui: React.ReactElement) {
  i18n.activate("ro");
  return render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);
}

function footer(extra: Partial<FooterProps> & { locale: Locale }) {
  return (
    <Footer
      address="Str. Mitropolit Varlaam 65, Chișinău"
      phone="+373 22 22 33 44"
      email="contact@expertcont.md"
      {...extra}
    />
  );
}

describe("Footer", () => {
  it("renders the brand logo (EXPERT + CONT text)", () => {
    renderWithI18n(footer({ locale: "ro" }));
    expect(screen.getByText("EXPERT")).toBeInTheDocument();
    expect(screen.getByText("CONT")).toBeInTheDocument();
  });

  it("renders 4 column headers: Services, Company, Resources, Legal", () => {
    renderWithI18n(footer({ locale: "ro" }));
    // Use exact text to avoid matching link text or tagline copy
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders 3 contact rows (address, phone, email)", () => {
    renderWithI18n(footer({ locale: "ro" }));
    expect(screen.getByText(/Mitropolit Varlaam/i)).toBeInTheDocument();
    expect(screen.getByText(/\+373/)).toBeInTheDocument();
    expect(screen.getByText(/contact@expertcont\.md/i)).toBeInTheDocument();
  });

  it("newsletter form: typing email + submit calls onNewsletterSubscribe and shows subscribed state on success", async () => {
    const handler = vi.fn().mockResolvedValue(true);
    renderWithI18n(footer({ locale: "ro", onNewsletterSubscribe: handler }));

    const input = screen.getByRole("textbox", { name: /email/i });
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const btn = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(btn);

    expect(handler).toHaveBeenCalledWith("test@example.com");
    expect(await screen.findByText(/subscribed/i)).toBeInTheDocument();
  });

  it("newsletter form: does not flip to subscribed when handler resolves false", async () => {
    const handler = vi.fn().mockResolvedValue(false);
    renderWithI18n(footer({ locale: "ro", onNewsletterSubscribe: handler }));

    const input = screen.getByRole("textbox", { name: /email/i });
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await handler.mock.results[0]?.value;
    expect(screen.queryByText(/subscribed/i)).not.toBeInTheDocument();
  });

  it("shows current year in the bottom bar", () => {
    renderWithI18n(footer({ locale: "ro" }));
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it("when locale=ru, the Pricing link in Company column points to /ru/tseny", () => {
    // No need to activate "ru" messages — sectionUrl is a pure function unrelated to i18n messages.
    // We keep the ro locale active so there's no "messages not loaded" warning.
    renderWithI18n(footer({ locale: "ru" }));
    // Find links with href /ru/tseny (Pricing in Company column)
    const links = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/ru/tseny");
    expect(links.length).toBeGreaterThan(0);
  });
});
