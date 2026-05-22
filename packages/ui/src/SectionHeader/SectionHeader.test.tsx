import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title", () => {
    render(<SectionHeader title="Our Services" />);
    expect(screen.getByRole("heading", { name: "Our Services" })).toBeInTheDocument();
  });

  it("renders the eyebrow when provided", () => {
    render(<SectionHeader eyebrow="Services" title="Title" />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<SectionHeader title="Title" subtitle="We help businesses grow" />);
    expect(screen.getByText("We help businesses grow")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<SectionHeader title="Title" />);
    expect(screen.queryByText(/grow/)).toBeNull();
  });
});
