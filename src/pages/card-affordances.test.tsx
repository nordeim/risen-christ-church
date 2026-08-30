import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Worship } from "@/pages/Worship";
import { Give } from "@/pages/Give";
import { Serve } from "@/pages/Serve";
import { NewsEvents } from "@/pages/NewsEvents";
import { About } from "@/pages/About";

/**
 * Round-7 contract (docs/design-enhancement-round7-2026-08-31.md P-8):
 * hover affordances tell the truth. Info-only articles warm-tint on hover
 * (card-tint) and never lift (card-lift); card-lift is reserved for
 * genuinely interactive cards — the Home featured events become real links
 * to the events page.
 */
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

function expectTintArticle(_container: HTMLElement, heading: RegExp) {
  const article = screen.getByRole("heading", { name: heading }).closest("article");
  expect(article).not.toBeNull();
  expect(article!.className).toContain("card-tint");
  expect(article!.className).not.toContain("card-lift");
  return article!;
}

describe("Card affordance honesty", () => {
  it("Worship devotion cards tint instead of lifting", () => {
    renderWithRouter(<Worship />);
    expectTintArticle(document.body, /Adoration of the Blessed Sacrament/i);
  });

  it("Give option cards tint instead of lifting", () => {
    renderWithRouter(<Give />);
    expectTintArticle(document.body, /Weekend collections/i);
  });

  it("Serve role cards tint instead of lifting", () => {
    renderWithRouter(<Serve />);
    expectTintArticle(document.body, /Catechists/i);
  });

  it("News & Events cards tint instead of lifting", () => {
    renderWithRouter(<NewsEvents />);
    expectTintArticle(document.body, /Sunday Reflections/i);
  });

  it("About pillar cards tint instead of lifting", () => {
    renderWithRouter(<About />);
    expectTintArticle(document.body, /^Grateful$/);
  });

  it("Home featured events are real links to the events page (lift is honest)", () => {
    renderWithRouter(<Home />);
    const heading = screen.getByRole("heading", { level: 3, name: /Feast of/i });
    const link = heading.closest("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/news-events");
    expect(link!.className).toContain("card-lift");
    expect(link!.className).not.toContain("card-tint");
  });
});
