import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Serve } from "@/pages/Serve";
import { Give } from "@/pages/Give";

/**
 * Round-2 contract: headings inside dark maroon-900 CTA bands must carry an
 * explicit light color class. Without it they inherit the global
 * `h1-h4 → text-shrine-maroon-700` base rule and render at ~1.26:1 on
 * maroon-900 — an WCAG-failing "invisible heading" (verified live 2026-08-29).
 */
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("CTA band headings carry correct explicit color", () => {
  it("Home dark band h2 on maroon-950 is cream (light heading)", () => {
    renderWithRouter(<Home />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /the church exists to evangelise/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
  });

  it("Serve heading on cream is maroon (not invisible)", () => {
    renderWithRouter(<Serve />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /where you might belong/i,
    });
    expect(h2.className).toContain("text-shrine-maroon-700");
  });

  it("Give heading on cream is maroon (not invisible)", () => {
    renderWithRouter(<Give />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /how to give/i,
    });
    expect(h2.className).toContain("text-shrine-maroon-700");
  });

  // Round-5 (docs/design-enhancement-round5-2026-08-30.md P-4): Give closes
  // with a dark band mirroring the Home CTA band — the new h2 must carry the
  // explicit cream color or it inherits maroon-700 on maroon-950 (invisible).
  it("Give closing band h2 on maroon-950 is cream (light heading)", () => {
    renderWithRouter(<Give />);
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /every gift keeps the hill a house of prayer/i,
    });
    expect(h2.className).toContain("text-shrine-cream");
    // The band surfaces canonical site.ts facts, not new copy.
    expect(screen.getByText(/Prefer to give in person\?/).textContent).toContain(
      "Reception",
    );
    expect(
      screen.getByRole("link", { name: /write to the parish/i }),
    ).toHaveAttribute("href", `mailto:connect.stmary@catholic.org.sg`);
  });
});
