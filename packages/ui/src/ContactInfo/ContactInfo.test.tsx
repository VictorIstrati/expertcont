import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@expertcont/i18n";
import { ContactInfo } from "./ContactInfo";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);
}

const defaultProps = {
  address: "Str. Mihai Eminescu 12, Chișinău, MD-2001",
  phone: "+373 22 123 456",
  email: "contact@expertcont.md",
  hours: "Lun–Vin 09:00–18:00",
};

describe("ContactInfo", () => {
  it("renders all 4 rows of contact information", () => {
    renderWithI18n(<ContactInfo {...defaultProps} />);
    expect(screen.getByText(defaultProps.address)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.phone)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.hours)).toBeInTheDocument();
  });

  it("phone link starts with tel:", () => {
    renderWithI18n(<ContactInfo {...defaultProps} />);
    const phoneLink = screen.getByRole("link", { name: defaultProps.phone });
    expect(phoneLink).toHaveAttribute("href", "tel:+37322123456");
  });

  it("email link starts with mailto:", () => {
    renderWithI18n(<ContactInfo {...defaultProps} />);
    const emailLink = screen.getByRole("link", { name: defaultProps.email });
    expect(emailLink).toHaveAttribute("href", "mailto:contact@expertcont.md");
  });
});
