import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@expertcont/i18n";
import { Footer } from "./Footer";

function renderWithI18n(ui: React.ReactElement) {
  i18n.activate("ro");
  return render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);
}

describe("Footer", () => {
  it("renders brand logo (EXPERT / CONT text)", () => {
    renderWithI18n(<Footer locale="ro" />);
    // The horizontal Logo variant renders "EXPERT" and "CONT" as visible text spans
    expect(screen.getByText("EXPERT")).toBeInTheDocument();
    expect(screen.getByText("CONT")).toBeInTheDocument();
  });

  it("renders 4 column headers: Services, Company, Resources, Legal", () => {
    renderWithI18n(<Footer locale="ro" />);
    // Use exact text to avoid matching link text or tagline copy
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders 3 contact rows (address, phone, email)", () => {
    renderWithI18n(<Footer locale="ro" />);
    expect(screen.getByText(/Mitropolit Varlaam/i)).toBeInTheDocument();
    expect(screen.getByText(/\+373/)).toBeInTheDocument();
    expect(screen.getByText(/contact@expertcont\.md/i)).toBeInTheDocument();
  });

  it("newsletter form: typing email + submit calls onNewsletterSubscribe and shows subscribed state", () => {
    const handler = vi.fn();
    renderWithI18n(<Footer locale="ro" onNewsletterSubscribe={handler} />);

    const input = screen.getByRole("textbox", { name: /email/i });
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const btn = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(btn);

    expect(handler).toHaveBeenCalledWith("test@example.com");
    expect(screen.getByText(/subscribed/i)).toBeInTheDocument();
  });

  it("shows current year in the bottom bar", () => {
    renderWithI18n(<Footer locale="ro" />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it("when locale=ru, the Pricing link in Company column points to /ru/tseny", () => {
    // No need to activate "ru" messages — sectionUrl is a pure function unrelated to i18n messages.
    // We keep the ro locale active so there's no "messages not loaded" warning.
    renderWithI18n(<Footer locale="ru" />);
    // Find links with href /ru/tseny (Pricing in Company column)
    const links = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/ru/tseny");
    expect(links.length).toBeGreaterThan(0);
  });
});
