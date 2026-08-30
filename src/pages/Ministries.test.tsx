import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Ministries } from "@/pages/Ministries";

function renderMinistries(initialEntry = "/ministries") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Ministries />
    </MemoryRouter>,
  );
}

describe("Ministries jump nav", () => {
  it("renders 6 jump pills", () => {
    renderMinistries();
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    expect(nav.querySelectorAll("a")).toHaveLength(6);
  });

  it("marks the pill matching the location hash with aria-current", () => {
    renderMinistries("/ministries#liturgical");
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    const liturgical = nav.querySelectorAll("a")[0] as HTMLAnchorElement;
    const formation = nav.querySelectorAll("a")[1] as HTMLAnchorElement;
    expect(liturgical).toHaveAttribute("aria-current", "true");
    expect(formation).not.toHaveAttribute("aria-current");
  });

  it("scrollspy marks exactly one pill when no hash is set (round 7)", () => {
    // jsdom's IO mock reports every observed section intersecting, so the
    // spy legitimately tracks a reading position even without a hash —
    // exactly one pill must be current (round-7 scrollspy contract).
    renderMinistries();
    const nav = screen.getByRole("navigation", { name: /Jump to ministry/i });
    const current = Array.from(nav.querySelectorAll("a")).filter(
      (pill) => pill.getAttribute("aria-current") === "true",
    );
    expect(current).toHaveLength(1);
  });
});
