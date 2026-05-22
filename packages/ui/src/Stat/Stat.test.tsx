import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stat } from "./Stat";

describe("Stat", () => {
  it("renders the value", () => {
    render(<Stat value="500+" label="Clients" />);
    expect(screen.getByText("500+")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(<Stat value="500+" label="Happy Clients" />);
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("uses accent color when accent=true", () => {
    const { container } = render(<Stat value="99%" label="Satisfaction" accent />);
    const statValue = container.querySelector(".stat-value") as HTMLElement;
    expect(statValue.style.color).toBe("var(--color-accent)");
  });

  it("uses inherit color when accent is not set", () => {
    const { container } = render(<Stat value="10" label="Years" />);
    const statValue = container.querySelector(".stat-value") as HTMLElement;
    expect(statValue.style.color).toBe("inherit");
  });
});
