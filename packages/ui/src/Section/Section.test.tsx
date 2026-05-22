import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  it("renders children inside a section element", () => {
    render(<Section>Hello world</Section>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(document.querySelector("section")).toBeInTheDocument();
  });

  it("renders as a different element when as prop is provided", () => {
    render(<Section as="div">Content</Section>);
    expect(document.querySelector("div.section")).toBeInTheDocument();
  });
});
