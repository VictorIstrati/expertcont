import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@expertcont/i18n";
import { PriceCard } from "./PriceCard";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);
}

describe("PriceCard", () => {
  const defaultProps = {
    name: "Starter",
    price: "990 MDL",
    features: ["Basic accounting", "Monthly reports", "Email support"],
    ctaLabel: "Get started",
  };

  it("renders name and price", () => {
    renderWithI18n(<PriceCard {...defaultProps} />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("990 MDL")).toBeInTheDocument();
  });

  it("renders all features", () => {
    renderWithI18n(<PriceCard {...defaultProps} />);
    expect(screen.getByText("Basic accounting")).toBeInTheDocument();
    expect(screen.getByText("Monthly reports")).toBeInTheDocument();
    expect(screen.getByText("Email support")).toBeInTheDocument();
  });

  it("applies featured class when featured=true", () => {
    renderWithI18n(<PriceCard {...defaultProps} featured />);
    const article = document.querySelector("article");
    expect(article?.className).toContain("featured");
  });

  it("does not apply featured class when featured=false", () => {
    renderWithI18n(<PriceCard {...defaultProps} featured={false} />);
    const article = document.querySelector("article");
    expect(article?.className).not.toContain("featured");
  });

  it("renders the Recommended badge when featured", () => {
    renderWithI18n(<PriceCard {...defaultProps} featured />);
    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });

  it("renders period when provided", () => {
    renderWithI18n(<PriceCard {...defaultProps} period="/ month" />);
    expect(screen.getByText("/ month")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    renderWithI18n(<PriceCard {...defaultProps} description="Best for small businesses" />);
    expect(screen.getByText("Best for small businesses")).toBeInTheDocument();
  });

  it("renders button with primary variant when featured", () => {
    renderWithI18n(<PriceCard {...defaultProps} featured ctaHref="/contact" />);
    const btn = screen.getByRole("link");
    expect(btn.className).toContain("primary");
  });

  it("renders button with ghost variant when not featured", () => {
    renderWithI18n(<PriceCard {...defaultProps} ctaHref="/contact" />);
    const btn = screen.getByRole("link");
    expect(btn.className).toContain("ghost");
  });
});
