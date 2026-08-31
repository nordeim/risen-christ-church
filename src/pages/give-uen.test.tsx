import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Give } from "@/pages/Give";
import { site } from "@/data/site";

/**
 * Round-12 contract — closes audit finding F-4: the Give page's "how to give"
 * section set the parish's tax identifier "UEN T08CC4042G" as its display
 * heading (Fraunces 3xl–4xl) — a compliance string performing as the section's
 * voice, announced as the section title in the screen-reader page outline.
 * The audit's fix: title the section for humans and demote the UEN into a
 * copyable detail row inside the PayNow card, where it is functionally needed.
 */
function renderGive() {
  return render(
    <MemoryRouter>
      <Give />
    </MemoryRouter>,
  );
}

describe("Give section heading (audit F-4)", () => {
  it("titles the section for humans — no heading carries the UEN string", () => {
    renderGive();
    const headings = screen.getAllByRole("heading");
    const offenders = headings.filter((h) => h.textContent?.includes("UEN"));
    expect(offenders).toEqual([]);
    // The how-to-give section announces a real title in the page outline.
    expect(screen.getByRole("heading", { level: 2, name: "Ways to give" })).toBeTruthy();
  });
});

describe("copyable UEN detail row (audit F-4)", () => {
  it("shows the UEN exactly once, inside the featured PayNow card, with a copy control", () => {
    renderGive();
    const withUen = screen.getAllByText((_, el) => el?.textContent === site.uen);
    expect(withUen).toHaveLength(1);

    const featured = document.querySelector<HTMLElement>('[data-featured="true"]')!;
    expect(featured.textContent).toContain(site.uen);
    expect(withUen[0]!.closest('[data-featured="true"]')).toBe(featured);

    const copy = screen.getByRole("button", { name: `Copy UEN ${site.uen}` });
    expect(copy).toBeTruthy();
  });

  it("clicking Copy writes the UEN to the clipboard and confirms", async () => {
    renderGive();
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    await fireEvent.click(screen.getByRole("button", { name: `Copy UEN ${site.uen}` }));
    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(site.uen);
      expect(screen.getByRole("button", { name: "Copied" })).toBeTruthy();
    });

    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
  });
});
