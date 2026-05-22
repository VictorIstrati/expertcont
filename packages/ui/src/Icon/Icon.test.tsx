import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an svg for a known icon name", () => {
    const { container } = render(<Icon name="arrow-right" />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("applies the size prop", () => {
    const { container } = render(<Icon name="check" size={32} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("height")).toBe("32");
  });

  it("renders null for the default/unknown fallback via TypeScript-safe cast", () => {
    // @ts-expect-error — testing runtime fallback
    const { container } = render(<Icon name="does-not-exist" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders whatsapp with fill=currentColor", () => {
    const { container } = render(<Icon name="whatsapp" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("fill")).toBe("currentColor");
  });

  it("renders star with fill=currentColor", () => {
    const { container } = render(<Icon name="star" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("fill")).toBe("currentColor");
  });
});
