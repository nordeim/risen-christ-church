import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "@/pages/NotFound";

/**
 * Round-5 contract (docs/design-enhancement-round5-2026-08-30.md P-10):
 * the 404 page keeps the brand warmth — a ghosted tau emblem and the same
 * staged rise-in entrance as every other hero surface.
 */
function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe("NotFound warmth", () => {
  it("renders a ghosted tau emblem inside the section", () => {
    const { container } = renderNotFound();
    const svg = container.querySelector("section svg");
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute("aria-hidden")).toBe("true");
    expect(svg!.querySelector("path")).not.toBeNull();
  });

  it("stages content in with the rise-in entrance", () => {
    renderNotFound();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.className).toContain("rise-in");
    expect(h1.className).toContain("rise-in-d1");
  });
});
