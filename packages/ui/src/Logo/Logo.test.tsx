import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the mark variant with aria-label", () => {
    render(<Logo variant="mark" />);
    expect(screen.getByRole("img", { name: "ExpertCont" })).toBeInTheDocument();
  });

  it("renders the horizontal variant by default", () => {
    const { container } = render(<Logo />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(1);
    expect(svgs[0]?.getAttribute("aria-hidden")).toBe("true");
    // Should show EXPERT + CONT text
    expect(screen.getByText("EXPERT")).toBeInTheDocument();
    expect(screen.getByText("CONT")).toBeInTheDocument();
  });

  it("renders tagline when withTagline=true", () => {
    render(<Logo withTagline />);
    expect(screen.getByText(/Experiență/)).toBeInTheDocument();
  });

  it("does not render tagline by default", () => {
    render(<Logo />);
    expect(screen.queryByText(/Experiență/)).toBeNull();
  });
});
