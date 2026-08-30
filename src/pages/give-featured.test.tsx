import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Give } from "@/pages/Give";
import { givingOptions } from "@/data/content";

/**
 * Round-7 contract (docs/design-enhancement-round7-2026-08-31.md P-4/P-8):
 * the PayNow card — the primary giving channel — carries the featured
 * treatment (gold top rule + gold tint, same language as the "Today" Mass
 * card), exactly one card is featured, and giving cards are honest info
 * cards: card-tint, never card-lift.
 */
function renderGive() {
  return render(
    <MemoryRouter>
      <Give />
    </MemoryRouter>,
  );
}

describe("Give featured PayNow card", () => {
  it("marks exactly one card featured and it is PayNow", () => {
    renderGive();
    const featured = document.querySelectorAll('[data-featured="true"]');
    expect(featured).toHaveLength(1);
    expect(featured[0].textContent).toContain("PayNow");
  });

  it("featured card carries the gold top rule + tint; grid uses card-tint (no lift)", () => {
    renderGive();
    const featured = document.querySelector<HTMLElement>('[data-featured="true"]')!;
    expect(featured.className).toContain("border-t-2");
    expect(featured.className).toContain("border-t-shrine-gold-500");
    expect(featured.className).toContain("bg-shrine-gold-100/40");

    const cards = featured.closest(".grid")!.querySelectorAll("article");
    expect(cards.length).toBe(givingOptions.length);
    cards.forEach((card) => {
      expect(card.className).toContain("card-tint");
      expect(card.className).not.toContain("card-lift");
    });
  });
});
