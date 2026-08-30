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

  it("each priest card has an aria-hidden monogram disc with initials", () => {
    renderAbout();
    // 3 priests: Brian D'Souza → BD, Arun Bellarmin → AB, Dexter Chua → DC.
    for (const initials of ["BD", "AB", "DC"]) {
      const disc = screen.getByText(initials);
      expect(disc.getAttribute("aria-hidden")).toBe("true");
    }
    // The discs are visually round.
    const bd = screen.getByText("BD");
    const discEl = bd.closest("div") ?? bd;
    expect(discEl.className).toContain("rounded-full");
  });

  it("PPC roster rows render the household", () => {
    renderAbout();
    const rows = document.querySelectorAll("ul.divide-y li");
    expect(rows.length).toBe(7);
    // Rows carry role + name
    expect(screen.getByText("Secretariat")).toBeInTheDocument();
    expect(screen.getByText("Peter Quek")).toBeInTheDocument();
  });

  it("PPC roster rows carry the hover-tint affordance (round 7)", () => {
    renderAbout();
    const rows = document.querySelectorAll("ul.divide-y li");
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((row) => {
      expect(row.className).toContain("hover:bg-shrine-maroon-50/60");
      expect(row.className).toContain("transition-colors");
    });
  });
});
