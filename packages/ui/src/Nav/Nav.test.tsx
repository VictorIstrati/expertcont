import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@expertcont/i18n";
import { Nav } from "./Nav";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);
}

describe("Nav", () => {
  it("renders the brand logo (EXPERT + CONT text)", () => {
    renderWithI18n(<Nav locale="ro" />);
    expect(screen.getByText("EXPERT")).toBeInTheDocument();
    expect(screen.getByText("CONT")).toBeInTheDocument();
  });

  it("renders all 6 nav links", () => {
    renderWithI18n(<Nav locale="ro" />);
    // Desktop nav links (there may be duplicates because mobile panel also renders them,
    // but getAllByText ensures at least one of each label exists)
    expect(screen.getAllByText(/solutions/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/services/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/pricing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/blog/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0);
  });

  it("calls onBookConsult when Book button is clicked", () => {
    const onBookConsult = vi.fn();
    renderWithI18n(<Nav locale="ro" onBookConsult={onBookConsult} />);
    // "Book a consultation" button(s) — click the first one
    const firstBookBtn = screen.getAllByText(/book a consultation/i)[0]!;
    fireEvent.click(firstBookBtn);
    expect(onBookConsult).toHaveBeenCalledTimes(1);
  });

  it("hamburger button exists", () => {
    renderWithI18n(<Nav locale="ro" />);
    expect(screen.getByRole("button", { name: /open menu|close menu/i })).toBeInTheDocument();
  });

  it("calls onLocaleChange when a locale menu item is clicked", () => {
    const onLocaleChange = vi.fn();
    renderWithI18n(<Nav locale="ro" onLocaleChange={onLocaleChange} />);
    // Open the language dropdown
    fireEvent.click(screen.getByRole("button", { name: /language/i }));
    // Click Русский
    const rusBtn = screen.getByText("Русский");
    fireEvent.mouseDown(rusBtn);
    expect(onLocaleChange).toHaveBeenCalledWith("ru");
  });

  it("calls onThemeChange when theme toggle is clicked", () => {
    const onThemeChange = vi.fn();
    renderWithI18n(<Nav locale="ro" theme="light" onThemeChange={onThemeChange} />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
  });

  it("calls onThemeChange with 'light' when theme is dark", () => {
    const onThemeChange = vi.fn();
    renderWithI18n(<Nav locale="ro" theme="dark" onThemeChange={onThemeChange} />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(onThemeChange).toHaveBeenCalledWith("light");
  });

  it("hides theme toggle when theme prop is omitted", () => {
    renderWithI18n(<Nav locale="ro" />);
    expect(screen.queryByRole("button", { name: /toggle theme/i })).not.toBeInTheDocument();
  });

  it("highlights the active section link", () => {
    renderWithI18n(<Nav locale="ro" activeSection="pricing" />);
    const pricingLinks = screen.getAllByText(/pricing/i);
    // at least one link should have the linkActive class
    const hasActive = pricingLinks.some((el) => el.closest("a")?.className?.includes("linkActive"));
    expect(hasActive).toBe(true);
  });

  it("uses locale-appropriate href for services link", () => {
    renderWithI18n(<Nav locale="ro" />);
    // ro locale: services → /servicii
    const links = screen.getAllByRole("link");
    const servicesHref = links.find((l) => l.getAttribute("href") === "/servicii");
    expect(servicesHref).toBeTruthy();
  });
});
