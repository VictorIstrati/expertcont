import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArrowLink } from "./ArrowLink";

describe("ArrowLink", () => {
  it("renders children", () => {
    render(<ArrowLink>Read more</ArrowLink>);
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("has btn-link class", () => {
    render(<ArrowLink href="/test">Go</ArrowLink>);
    const link = screen.getByRole("link", { name: /Go/i });
    expect(link.className).toContain("btn-link");
  });

  it("renders the arrow icon", () => {
    const { container } = render(<ArrowLink>Next</ArrowLink>);
    expect(container.querySelector(".arrow svg")).not.toBeNull();
  });

  it("uses provided href", () => {
    render(<ArrowLink href="/services">Services</ArrowLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/services");
  });
});
