import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NewsEvents } from "@/pages/NewsEvents";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-6):
 * event cards render the category inside a bordered gold chip (rounded-full)
 * with the categoryTone color, and the date outside the chip in display serif.
 * This is the "gold category chip" language from round-1 E4, now contracted.
 */
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("event category chips", () => {
  it("Home featured events render a rounded-full chip with the category", () => {
    renderWithRouter(<Home />);
    const chips = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/);
    expect(chips.length).toBeGreaterThanOrEqual(4);
    chips.forEach((chip) => {
      expect(chip.className).toContain("rounded-full");
      expect(chip.className).toContain("border");
    });
    // First chip (Parish) carries the maroon categoryTone.
    expect(chips[0]!.className).toContain("text-shrine-maroon-500");
  });

  it("NewsEvents events render a rounded-full chip with the category", () => {
    renderWithRouter(<NewsEvents />);
    const chips = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/);
    expect(chips.length).toBe(6);
    chips.forEach((chip) => {
      expect(chip.className).toContain("rounded-full");
    });
  });

  it("the date renders outside the chip in display serif", () => {
    renderWithRouter(<NewsEvents />);
    // Event card metadata row: chip span + date span side by side.
    const chip = screen.getAllByText(/^(Parish|Devotion|Formation|Archdiocese)$/)[0]!;
    const row = chip.closest("p");
    expect(row).not.toBeNull();
    const spans = row!.querySelectorAll("span");
    expect(spans.length).toBe(2);
    expect(spans[1]!.className).toContain("font-display");
  });
});
