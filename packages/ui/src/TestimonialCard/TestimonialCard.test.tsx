import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialCard } from "./TestimonialCard";

describe("TestimonialCard", () => {
  it("renders author and body", () => {
    render(<TestimonialCard author="Ion Popescu" body="Excellent service, highly recommend!" />);
    expect(screen.getByText("Ion Popescu")).toBeInTheDocument();
    expect(screen.getByText("Excellent service, highly recommend!")).toBeInTheDocument();
  });

  it("renders authorCompany when provided", () => {
    render(
      <TestimonialCard author="Maria Ionescu" authorCompany="TechCorp SRL" body="Great work!" />,
    );
    expect(screen.getByText("TechCorp SRL")).toBeInTheDocument();
  });

  it("renders correct number of filled stars for a given rating", () => {
    render(<TestimonialCard author="Test" body="Test body" rating={4} />);
    const starsContainer = screen.getByLabelText("Rating: 4 out of 5");
    const stars = starsContainer.querySelectorAll("span");
    const onStars = Array.from(stars).filter((s) => s.className.includes("starOn"));
    const offStars = Array.from(stars).filter((s) => s.className.includes("starOff"));
    expect(onStars).toHaveLength(4);
    expect(offStars).toHaveLength(1);
  });

  it("renders 5 filled stars for rating=5", () => {
    render(<TestimonialCard author="Test" body="Test body" rating={5} />);
    const starsContainer = screen.getByLabelText("Rating: 5 out of 5");
    const onStars = starsContainer.querySelectorAll(".starOn");
    expect(onStars).toHaveLength(5);
  });

  it("does not render stars when rating is undefined", () => {
    render(<TestimonialCard author="Test" body="Test body" />);
    expect(screen.queryByLabelText(/Rating/)).not.toBeInTheDocument();
  });
});
