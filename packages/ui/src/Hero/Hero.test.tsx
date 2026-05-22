import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the title", () => {
    render(<Hero title="Welcome to ExpertCont" />);
    expect(screen.getByText("Welcome to ExpertCont")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<Hero title="Title" subtitle="Our subtitle text" />);
    expect(screen.getByText("Our subtitle text")).toBeInTheDocument();
  });

  it("does not render eyebrow when not provided", () => {
    render(<Hero title="Title" />);
    // eyebrow div should not be in the DOM
    expect(document.querySelector(".eyebrow")).not.toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<Hero title="Title" eyebrow="Accounting Services" />);
    expect(screen.getByText("Accounting Services")).toBeInTheDocument();
  });

  it("renders cta slot", () => {
    render(<Hero title="Title" cta={<button>Book Now</button>} />);
    expect(screen.getByRole("button", { name: "Book Now" })).toBeInTheDocument();
  });

  it("renders aside slot", () => {
    render(<Hero title="Title" aside={<div data-testid="aside-content">Aside</div>} />);
    expect(screen.getByTestId("aside-content")).toBeInTheDocument();
  });
});
