import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { About } from "@/pages/About";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-5):
 * pillar numerals are display-serif ghost figures, every friar card carries
 * an aria-hidden monogram disc, and PPC rows carry a hover tint.
 */
function renderAbout() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
}

describe("About visual identity", () => {
  it("pillar numerals use the display serif at ghost scale", () => {
    renderAbout();
    const one = screen.getByText("01");
    expect(one.className).toContain("font-display");
    expect(one.className).toContain("text-5xl");
  });

  it("each friar card has an aria-hidden monogram disc with initials", () => {
    renderAbout();
    // 4 friars: Esmond Chua → EC, Julian Mariaratnam → JM, Justin Lim → JL, Robin Toha → RT.
    for (const initials of ["EC", "JM", "JL", "RT"]) {
      const disc = screen.getByText(initials);
      expect(disc.getAttribute("aria-hidden")).toBe("true");
    }
    // The discs are visually round.
    const ec = screen.getByText("EC");
    expect(ec.closest("span")?.className).toContain("rounded-full");
  });

  it("PPC roster rows carry the hover-tint transition", () => {
    renderAbout();
    const rows = document.querySelectorAll("ul.divide-y li");
    expect(rows.length).toBeGreaterThanOrEqual(6);
    rows.forEach((li) => {
      expect(li.className).toContain("transition-colors");
      expect(li.className).toContain("hover:bg-shrine-maroon-50");
    });
  });
});
