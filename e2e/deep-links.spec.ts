import { expect, test } from "@playwright/test";

/**
 * Round-12 — audit finding F-3: path-style deep links (hash stripped by chat
 * apps or lost in print) must land on the requested page instead of silently
 * rendering Home. Reproduced locally 2026-08-31 before this fix: /worship
 * rendered the Home hero ("He is risen.") at the path URL. The app rewrites
 * known path routes to their hash equivalents before React mounts
 * (src/utils/deepLinks.ts, wired in src/main.tsx).
 */
test.describe("path-style deep links (audit F-3)", () => {
  test("/worship lands on the Worship page", async ({ page }) => {
    await page.goto("/worship");
    await expect(page).toHaveURL(/#\/worship/);
    // The Worship page h1 — "worship" does not appear in the copy itself.
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /mass, mercy/i,
    );
  });

  test("/news-events lands on News & Events", async ({ page }) => {
    await page.goto("/news-events");
    await expect(page).toHaveURL(/#\/news-events/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /life of the parish/i,
    );
  });

  test("the /donate alias lands on Give", async ({ page }) => {
    await page.goto("/donate");
    await expect(page).toHaveURL(/#\/donate/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
