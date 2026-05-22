import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImagePlaceholder } from "./ImagePlaceholder";

describe("ImagePlaceholder", () => {
  it("renders the default label", () => {
    render(<ImagePlaceholder />);
    expect(screen.getByText("Photo")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<ImagePlaceholder label="Team" />);
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("renders the Logo mark", () => {
    render(<ImagePlaceholder />);
    expect(screen.getByRole("img", { name: "ExpertCont" })).toBeInTheDocument();
  });
});
