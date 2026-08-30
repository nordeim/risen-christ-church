import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Timeline } from "@/components/Timeline";
import { lifeTimeline } from "@/data/content";

describe("Timeline rail + display years", () => {
  it("renders a gradient rail with the timeline-rail testid", () => {
    const { container } = render(<Timeline />);
    const rail = container.querySelector('[data-testid="timeline-rail"]');
    expect(rail).not.toBeNull();
    expect(rail!.className).toContain("bg-gradient-to-b");
    expect(rail!.className).toContain("via-shrine-gold-400");
    const ol = container.querySelector("ol")!;
    expect(ol.className).not.toContain("border-l");
  });

  it("renders years for each timeline entry", () => {
    const { container } = render(<Timeline />);
    const items = container.querySelectorAll("ol li");
    expect(items.length).toBe(lifeTimeline.length);
    items.forEach((li) => {
      const year = li.querySelector("p");
      expect(year).not.toBeNull();
      expect(year!.className).toContain("text-shrine-maroon-500");
    });
  });

  it("keeps one dot-pulse halo per entry", () => {
    const { container } = render(<Timeline />);
    expect(container.querySelectorAll(".dot-pulse").length).toBe(lifeTimeline.length);
  });
});
