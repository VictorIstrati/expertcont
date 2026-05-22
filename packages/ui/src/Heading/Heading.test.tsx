import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an <h1> at level 1 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
  });

  it("renders an <h2> when level=2", () => {
    render(<Heading level={2}>Sub</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Sub" })).toBeInTheDocument();
  });

  it("renders an <h3> when level=3", () => {
    render(<Heading level={3}>Sub-sub</Heading>);
    expect(screen.getByRole("heading", { level: 3, name: "Sub-sub" })).toBeInTheDocument();
  });

  it("applies the size class corresponding to its visual size", () => {
    render(
      <Heading level={2} size="display">
        Big
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 2 }).className).toContain("display");
  });
});
