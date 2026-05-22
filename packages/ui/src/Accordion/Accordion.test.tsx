import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { q: "What do you offer?", a: "Accounting and HR services." },
  { q: "How do I start?", a: "Contact us for a free consultation." },
];

describe("Accordion", () => {
  it("renders all questions", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("What do you offer?")).toBeInTheDocument();
    expect(screen.getByText("How do I start?")).toBeInTheDocument();
  });

  it("does not show answer initially", () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText("Accounting and HR services.")).toBeNull();
  });

  it("shows answer after clicking a question", () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByText("What do you offer?"));
    expect(screen.getByText("Accounting and HR services.")).toBeInTheDocument();
  });

  it("closes the item when clicked again", () => {
    render(<Accordion items={items} />);
    const btn = screen.getByText("What do you offer?");
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText("Accounting and HR services.")).toBeNull();
  });
});
