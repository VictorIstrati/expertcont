import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container>
        <span data-testid="child">x</span>
      </Container>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders a <div> by default", () => {
    const { container } = render(<Container>x</Container>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as the requested element when `as` is provided", () => {
    const { container } = render(<Container as="section">x</Container>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("applies the container class", () => {
    const { container } = render(<Container>x</Container>);
    expect((container.firstChild as HTMLElement).className).toContain("container");
  });
});
