import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceCard } from "./ServiceCard";

describe("ServiceCard", () => {
  it("renders title and summary", () => {
    render(
      <ServiceCard title="Accounting" summary="Expert accounting services" href="/accounting" />,
    );
    expect(screen.getByText("Accounting")).toBeInTheDocument();
    expect(screen.getByText("Expert accounting services")).toBeInTheDocument();
  });

  it("renders as an anchor with correct href", () => {
    render(<ServiceCard title="Legal" summary="Legal services" href="/legal" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/legal");
  });

  it("renders icon when provided", () => {
    render(
      <ServiceCard
        title="HR"
        summary="HR services"
        href="/hr"
        icon={<span data-testid="icon">★</span>}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render icon container when icon not provided", () => {
    render(<ServiceCard title="IT" summary="IT services" href="/it" />);
    expect(document.querySelector(".icon")).not.toBeInTheDocument();
  });
});
