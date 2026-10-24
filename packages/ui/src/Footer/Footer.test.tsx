import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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

  it("links the data protection policy in the Legal column", () => {
    renderWithI18n(footer({ locale: "en" }));
    const link = screen.getByRole("link", { name: "Data protection" });
    expect(link).toHaveAttribute("href", "/en/data-protection");
  });
});
