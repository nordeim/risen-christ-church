import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Worship } from "@/pages/Worship";
import { massDayKey } from "@/utils/massDay";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-3):
 * exactly one Mass-time card is highlighted as "today", the highlighted card
 * matches massDayKey(new Date()) (single shared source — cannot disagree),
 * and the Sunday slot list carries gold-dot markers + a hover tint.
 */
function renderWorship() {
  return render(
    <MemoryRouter>
      <Worship />
    </MemoryRouter>,
  );
}

describe("Worship mass-times today highlight", () => {
  it("marks exactly one card as today", () => {
    renderWorship();
    const todayCards = screen
      .getAllByTestId("mass-card")
      .filter((card) => card.dataset.today === "true");
    expect(todayCards).toHaveLength(1);
  });

  it("the today card matches massDayKey(new Date())", () => {
    renderWorship();
    const key = massDayKey(new Date());
    const heading =
      key === "sunday" ? "Sunday" : key === "saturday" ? "Saturday" : "Weekdays";
    const card = document.querySelector(`[data-card-day="${key}"]`);
    expect(card?.getAttribute("data-today")).toBe("true");
    expect(
      screen.getByRole("heading", { level: 3, name: heading }),
    ).toBeInTheDocument();
  });

  it("today card carries the visible 'Today' chip", () => {
    renderWorship();
    const chip = screen.getByTestId("mass-today-chip");
    expect(chip).toHaveTextContent("Today");
    expect(chip.className).toContain("bg-shrine-gold-500");
    // The chip must live inside the highlighted card.
    expect(chip.closest('[data-testid="mass-card"]')?.getAttribute("data-today")).toBe(
      "true",
    );
  });

  it("Sunday slot list items carry the gold-dot marker + hover tint classes", () => {
    renderWorship();
    const sundayCard = document.querySelector<HTMLElement>('[data-card-day="sunday"]');
    expect(sundayCard).not.toBeNull();
    const items = sundayCard!.querySelectorAll("li");
    expect(items.length).toBe(5);
    items.forEach((li) => {
      expect(li.className).toContain("transition-colors");
      expect(li.querySelector("span.bg-shrine-gold-500")).not.toBeNull();
    });
  });

  it("confession copy column stays anchored beside the devotion cards (round 7)", () => {
    renderWorship();
    // The Reconciliation heading's column is the sticky story of the section.
    const heading = screen.getByRole("heading", {
      level: 3,
      name: /Sacrament of Reconciliation/i,
    });
    const column = heading.closest("div.lg\\:sticky") ?? heading.parentElement;
    expect(column?.className).toContain("lg:sticky");
    expect(column?.className).toContain("lg:top-28");
    expect(column?.className).toContain("lg:self-start");
  });
});

describe("Worship mass-card footnote contrast (round-12, audit F-2)", () => {
  it("renders every mass-card footnote at charcoal/85 (>= 4.5:1 on the parchment card)", () => {
    renderWorship();
    const cards = document.querySelectorAll<HTMLElement>('[data-testid="mass-card"]');
    expect(cards.length).toBeGreaterThanOrEqual(3);
    let footnotes = 0;
    cards.forEach((card) => {
      card.querySelectorAll("p").forEach((p) => {
        if (p.className.includes("text-shrine-charcoal/")) {
          footnotes += 1;
          expect(p.className).toContain("text-shrine-charcoal/85");
          // The failing step this contract replaces (4.16:1 on parchment).
          expect(p.className).not.toContain("text-shrine-charcoal/70");
        }
      });
    });
    expect(footnotes).toBeGreaterThanOrEqual(3);
  });
});
