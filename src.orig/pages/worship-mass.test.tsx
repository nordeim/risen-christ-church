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
    expect(items.length).toBeGreaterThanOrEqual(6);
    items.forEach((li) => {
      expect(li.className).toContain("transition-colors");
      expect(li.querySelector("span.bg-shrine-gold-500")).not.toBeNull();
    });
  });
});
