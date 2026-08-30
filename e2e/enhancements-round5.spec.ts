import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-5 "Light of the Portiuncula" E2E audit — validates the remediated
 * codebase (docs/design-enhancement-round5-2026-08-30.md):
 *   1. Worship highlights today's Mass card (matches the run date).
 *   2. Give closes with a dark band whose h2 is cream on maroon-950.
 *   3. History story column is sticky at desktop widths.
 *   4. Grounds card photographs drift (scale) on card hover.
 *   5. Timeline rail is a drawn gradient.
 *   6. NotFound carries the ghosted tau emblem.
 */

test.describe("Round-5 enhancement audit", () => {
  test("worship highlights exactly today's Mass card", async ({ page }) => {
    await gotoMain(page, "/worship");
    const cards = page.locator('[data-testid="mass-card"]');
    await expect(cards).toHaveCount(3);

    const today = new Date().getDay();
    const expected = today === 0 ? "sunday" : today === 6 ? "saturday" : "weekdays";

    const todayCards = page.locator('[data-testid="mass-card"][data-today="true"]');
    await expect(todayCards).toHaveCount(1);
    await expect(todayCards.first()).toHaveAttribute("data-card-day", expected);
    await expect(page.getByTestId("mass-today-chip")).toHaveText("Today");
  });

  test("give closing band h2 is cream on maroon-950", async ({ page }) => {
    await gotoMain(page, "/give");
    const band = page.locator('main section[class*="bg-shrine-maroon-950"]').last();
    const h2 = band.getByRole("heading", {
      name: /The 1971 church still needs its people/i,
    });
    await expect(h2).toBeVisible();
    // shrine-cream #faf6ec — the cta-bands contract extended to the new band.
    await expect(h2).toHaveCSS("color", "rgb(250, 246, 236)");
    await expect(band.getByText(/Parish Office|Mon.*Fri|6253 2166/i).first()).toBeVisible();
  });

  test("history story column is sticky at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoMain(page, "/history");
    const story = page.getByTestId("history-story");
    await expect(story).toBeVisible();
    await expect(story).toHaveCSS("position", "sticky");
    await expect(story).toHaveCSS("top", "112px"); // lg:top-28 = 7rem = 112px
  });

  test("grounds card photograph drifts on hover", async ({ page }) => {
    await gotoMain(page, "/");
    const card = page.locator("a.card-lift").filter({ hasText: "Main Church" }).first();
    const img = card.locator("img").first();
    await expect(img).toBeVisible();
    await expect(img).toHaveClass(/img-zoom/);

    await card.hover();
    // Transform-only drift settles at scale(1.045).
    await expect
      .poll(() => img.evaluate((el) => getComputedStyle(el).transform), { timeout: 5_000 })
      .toMatch(/^matrix\(1\.04/);
  });

  test("timeline rail is a drawn gradient", async ({ page }) => {
    await gotoMain(page, "/history");
    const rail = page.getByTestId("timeline-rail");
    await expect(rail).toBeAttached();
    const image = await rail.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(image).toContain("linear-gradient");
  });

  test("notfound carries the ghosted tau emblem", async ({ page }) => {
    await gotoMain(page, "/this-does-not-exist-r5");
    await expect(page.getByText(/This path does not lead to the church/i)).toBeVisible();
    const svg = page.locator("main section svg");
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

async function gotoMain(page: Page, route: string) {
  await gotoHash(page, route);
  await page.waitForTimeout(300);
}
