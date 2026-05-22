import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /Click me/i })).toBeInTheDocument();
  });

  it("applies the variant class for variant='primary'", () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("btn-primary");
  });

  it("applies the variant class for variant='ghost'", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").className).toContain("btn-ghost");
  });

  it("applies the variant class for variant='secondary'", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button").className).toContain("btn-secondary");
  });

  it("applies the variant class for variant='outline'", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button").className).toContain("btn-outline");
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as an anchor when an href is provided", () => {
    render(<Button href="/x">Link</Button>);
    const link = screen.getByRole("link", { name: /Link/i });
    expect(link).toHaveAttribute("href", "/x");
  });

  it("renders an icon on the left when icon prop is set", () => {
    const { container } = render(<Button icon="arrow-right">Go</Button>);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("applies btn-lg class when size='lg'", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toContain("btn-lg");
  });

  it("applies btn-sm class when size='sm'", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("btn-sm");
  });

  it("renders btn class on all buttons", () => {
    render(<Button>Base</Button>);
    expect(screen.getByRole("button").className).toContain("btn");
  });
});
