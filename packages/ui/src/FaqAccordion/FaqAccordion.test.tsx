import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FaqAccordion } from "./FaqAccordion";

const sampleItems = [
  {
    id: "q1",
    question: "What services do you offer?",
    answer: "<p>We offer accounting, legal, and HR services.</p>",
  },
  {
    id: "q2",
    question: "How much does it cost?",
    answer: "<p>Pricing starts from 990 MDL/month.</p>",
  },
  {
    id: "q3",
    question: "How do I get started?",
    answer: "<p>Book a free consultation online.</p>",
  },
];

describe("FaqAccordion", () => {
  it("renders all questions", () => {
    render(<FaqAccordion items={sampleItems} />);
    expect(screen.getByText("What services do you offer?")).toBeInTheDocument();
    expect(screen.getByText("How much does it cost?")).toBeInTheDocument();
    expect(screen.getByText("How do I get started?")).toBeInTheDocument();
  });

  it("renders the correct number of items", () => {
    render(<FaqAccordion items={sampleItems} />);
    const details = document.querySelectorAll("details");
    expect(details).toHaveLength(3);
  });

  it("answers are initially collapsed (details not open)", () => {
    render(<FaqAccordion items={sampleItems} />);
    const details = document.querySelectorAll("details");
    details.forEach((d) => {
      expect(d.hasAttribute("open")).toBe(false);
    });
  });

  it("renders empty list without errors", () => {
    render(<FaqAccordion items={[]} />);
    expect(document.querySelectorAll("details")).toHaveLength(0);
  });
});
