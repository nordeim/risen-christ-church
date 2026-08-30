import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { History } from "@/pages/History";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-2): the
 * story column stays anchored beside the timeline at desktop widths
 * (lg:sticky) and carries the closing lineage capstone.
 */
describe("History story column", () => {
  it("story block is sticky at desktop widths", () => {
    const { container } = render(<History />);
    const story = container.querySelector('[data-testid="history-story"]');
    expect(story).not.toBeNull();
    expect(story!.className).toContain("lg:sticky");
    expect(story!.className).toContain("lg:self-start");
    expect(story!.className).toContain("lg:top-28");
  });

  it("closes the story with the 1957→2026 lineage capstone", () => {
    render(<History />);
    expect(screen.getByText(/1957\s*→\s*2026/i)).toBeInTheDocument();
  });
});
