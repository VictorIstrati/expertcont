import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the mark variant with aria-label", () => {
    render(<Logo variant="mark" />);
    expect(screen.getByRole("img", { name: "ExpertCont" })).toBeInTheDocument();
  });

  it("renders the horizontal variant with EXPERT + CONT text", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByText("EXPERT")).toBeInTheDocument();
    expect(screen.getByText("CONT")).toBeInTheDocument();
  });
});
