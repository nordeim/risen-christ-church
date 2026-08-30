import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Timeline } from "@/components/Timeline";
import { lifeTimeline } from "@/data/content";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-7):
 * the rail is a drawn gradient (fading at both extremes) rather than a hard
 * border, and years take the display-serif voice.
 */
describe("Timeline rail + display years", () => {
  it("renders a gradient rail with the timeline-rail testid", () => {
    const { container } = render(<Timeline />);
    const rail = container.querySelector('[data-testid="timeline-rail"]');
    expect(rail).not.toBeNull();
    expect(rail!.className).toContain("bg-gradient-to-b");
    expect(rail!.className).toContain("via-shrine-gold-400");
    // The old hard border is gone.
    const ol = container.querySelector("ol")!;
    expect(ol.className).not.toContain("border-l");
  });

  it("renders years in the display serif voice", () => {
    const { container } = render(<Timeline />);
    // Year paragraphs are the first <p> in each entry, before the h3.
    const years = container.querySelectorAll("ol li > div > p:first-child");
    expect(years.length).toBe(lifeTimeline.length);
    years.forEach((year) => {
      expect(year.className).toContain("font-display");
      expect(year.className).toContain("text-shrine-gold-600");
    });
  });

  it("keeps one dot-pulse halo per entry", () => {
    const { container } = render(<Timeline />);
    expect(container.querySelectorAll(".dot-pulse").length).toBe(lifeTimeline.length);
  });
});
