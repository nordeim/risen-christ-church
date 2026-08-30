import { expect, test, type Page } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-7 "Honest Light" E2E audit — validates the remediated codebase
 * (docs/design-enhancement-round7-2026-08-31.md):
 *   1. Print never loses below-fold reveal content (print override).
 *   2. Worship mercy copy column is sticky at desktop widths.
 *   3. News & Events closes with a dark band whose h2 is cream on maroon-950.
 *   4. Give's PayNow card carries the featured gold treatment.
 *   5. Ministries jump pills track reading position (scrollspy).
 *   6. The active desktop nav item carries the permanent gold hairline.
 *   7. Home featured event cards are real links to the events page.
 *   8. FAQ closes with the office loop-back (phone + email).
 */

test.describe("Round-7 enhancement audit", () => {
  test("print media reveals below-fold timeline content", async ({ page }) => {
    await gotoMain(page, "/history");
    // The last timeline entry is far below the fold in screen media.
    const lastEntry = page.locator("main ol > li").last();
    await expect(lastEntry).toBeAttached();
    await page.emulateMedia({ media: "print" });
    await expect(lastEntry).toHaveCSS("opacity", "1");
    await page.emulateMedia({ media: "screen" });
  });

  test("worship mercy copy column is sticky at desktop widths", async ({ page }) => {
    await gotoMain(page, "/worship");
    const column = page
      .getByRole("heading", { name: /Sacrament of Reconciliation/i })
      .locator("xpath=ancestor::div[contains(@class,'lg:sticky')]");
    await expect(column).toBeVisible();
    await expect(column).toHaveCSS("position", "sticky");
    await expect(column).toHaveCSS("top", "112px"); // lg:top-28 = 7rem
  });

  test("news & events closing band h2 is cream on maroon-950", async ({ page }) => {
    await gotoMain(page, "/news-events");
    const band = page.locator('main section[class*="bg-shrine-maroon-950"]').last();
    const h2 = band.getByRole("heading", {
      name: /The bulletin keeps the household in one conversation/i,
    });
    await expect(h2).toBeVisible();
    // shrine-cream #faf6ec — the cta-bands contract extended to the new band.
    await expect(h2).toHaveCSS("color", "rgb(250, 246, 236)");
    await expect(
      band.getByRole("link", { name: /Read this week's bulletin/i }),
    ).toBeVisible();
  });

  test("give PayNow card carries the featured gold treatment", async ({ page }) => {
    await gotoMain(page, "/give");
    const featured = page.locator('[data-featured="true"]');
    await expect(featured).toHaveCount(1);
    await expect(featured).toContainText("PayNow");
    // shrine-gold-500 #c3963f — same featured language as the "Today" card.
    await expect(featured).toHaveCSS("border-top-color", "rgb(195, 150, 63)");
    await expect(featured).toHaveCSS("border-top-width", "2px");
  });

  test("ministries scrollspy moves aria-current to the section in view", async ({
    page,
  }) => {
    await gotoMain(page, "/ministries");
    const pills = page.getByRole("navigation", { name: /Jump to ministry/i });
    await expect(pills.locator("a")).toHaveCount(6);

    await page.locator("#faith-formation").scrollIntoViewIfNeeded();
    // No hard sleep — toHaveText auto-polls until the spy's IO callback moves
    // aria-current (round-7 audit L-1).
    const current = pills.locator('a[aria-current="true"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/Faith Formation/i);
  });

  test("active desktop nav item carries the permanent gold hairline", async ({
    page,
  }) => {
    await gotoMain(page, "/history");
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    const aboutTrigger = primaryNav.getByRole("button", { name: /About/i });
    await expect(aboutTrigger).toBeVisible();
    // The active item's hairline is drawn (Tailwind v4 scale-x → `scale` property).
    const activeScale = await aboutTrigger.evaluate((el) =>
      getComputedStyle(el, "::after").scale,
    );
    expect(activeScale).toBe("1");
    // …and an inactive item's hairline is collapsed (scaleX = 0).
    const serveLink = primaryNav.getByRole("link", { name: "Serve" });
    await expect(serveLink).toBeVisible();
    const inactiveScale = await serveLink.evaluate((el) =>
      getComputedStyle(el, "::after").scale,
    );
    // Computed `scale` serializes as "0" or "0 1" depending on the axis.
    expect(inactiveScale).toMatch(/^0(?:\s|$)/);
  });

  test("home featured event cards link to the events page", async ({ page }) => {
    await gotoMain(page, "/");
    const eventLink = page
      .getByRole("heading", { level: 3, name: /Feast of/i })
      .locator("xpath=ancestor::a");
    await expect(eventLink).toHaveCount(1);
    const href = await eventLink.getAttribute("href");
    expect(href).toMatch(/#\/news-events$/);
  });

  test("faq closes with the office loop-back", async ({ page }) => {
    await gotoMain(page, "/faq");
    await expect(page.getByRole("heading", { name: /Still have questions/i })).toBeVisible();
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: /\+65 6253 2166/ })).toBeVisible();
    await expect(
      main.getByRole("link", { name: /crc\.secretariat@catholic\.org\.sg/ }),
    ).toBeVisible();
  });
});

async function gotoMain(page: Page, route: string) {
  await gotoHash(page, route);
  await page.waitForTimeout(300);
}
