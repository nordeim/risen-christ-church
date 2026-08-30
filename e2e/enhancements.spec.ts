import { expect, test } from "@playwright/test";
import { gotoHash } from "./helpers";

/**
 * Round-2 "Sacred Polish" E2E audit — validates the remediated codebase:
 *   1. Dark CTA-band headings render cream (WCAG: was maroon-700 ~1.26:1).
 *   2. Head completeness: favicon, theme-color, OG image/url, Twitter card, JSON-LD.
 *   3. Route transitions: keyed page-in wrapper replays on pathname change.
 *   4. Scroll progress rail + BackToTop ring track page depth.
 *   5. Mobile drawer marks the active route (parity with desktop nav).
 */

test.describe("Round-2 enhancement audit", () => {
  test("dark CTA-band heading is cream on Home (light heading on maroon-950)", async ({ page }) => {
    await gotoHash(page, "/");
    const h2 = page.locator('main section[class*="bg-shrine-maroon-950"] h2').first();
    await expect(h2).toBeVisible();
    // shrine-cream #faf6ec — was maroon-700 #55191a (1.26:1 on maroon-900).
    await expect(h2).toHaveCSS("color", "rgb(250, 246, 236)");
    // Serve/Give use cream backgrounds for their SectionHeadings — verified via unit test cta-bands
  });

  test("head ships favicon, theme-color, social images, and Church JSON-LD", async ({ page }) => {
    await gotoHash(page, "/");
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
      "href",
      "/favicon.svg",
    );
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#200a0a",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://www.stmary.sg/images/hero-church.jpg",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://www.stmary.sg/",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    const jsonld = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonld).not.toBeNull();
    const parsed = JSON.parse(jsonld!) as {
      "@type": string;
      telephone: string;
      address: { streetAddress: string; postalCode: string };
    };
    expect(parsed["@type"]).toBe("Church");
    expect(parsed.telephone).toBe("+65 6567 3866");
    expect(parsed.address.streetAddress).toBe("5 Bukit Batok East Ave 2");
    expect(parsed.address.postalCode).toBe("659918");
  });

  test("favicon.svg resolves from public/", async ({ page }) => {
    const response = await page.request.get("/favicon.svg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg");
  });

  test("route changes replay the page-in wrapper", async ({ page }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    await expect(container).toHaveCSS("animation-name", "page-in");

    await page.click('nav[aria-label="Primary"] >> text=News & Events');
    await expect(container).toHaveAttribute("data-route", "/news-events");
    await expect(container).toHaveCSS("animation-name", "page-in");
  });

  test("hash-only navigation keeps the same keyed node (data-route unchanged)", async ({
    page,
  }) => {
    await gotoHash(page, "/worship");
    const container = page.getByTestId("page-container");
    await expect(container).toHaveAttribute("data-route", "/worship");
    // PageHero in-page CTA: /worship → /worship#mass (same pathname).
    await page.getByRole("link", { name: "Mass times" }).first().click();
    await expect(page).toHaveURL(/#mass/);
    await expect(container).toHaveAttribute("data-route", "/worship");
  });

  test("scroll progress rail fills with page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const rail = page.getByTestId("scroll-progress");
    await expect(rail).toBeAttached();
    await expect(rail).toHaveCSS("transform", "matrix(0, 0, 0, 1, 0, 0)");

    // Land at mid-depth (50%): a stable resting value that deterministically
    // matches. (Scrolling to the very bottom rests at matrix(1, …) which the
    // 0.x regex cannot match — the old form only passed when a poll sample
    // caught the smooth-scroll animation mid-flight; racy under load.)
    await page.evaluate(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.round(max * 0.5));
    });
    await expect
      .poll(() => rail.evaluate((el) => getComputedStyle(el).transform))
      .toMatch(/^matrix\(0\.[1-9]/);
  });

  test("BackToTop ring stroke offset tracks page depth", async ({ page }) => {
    await gotoHash(page, "/");
    const indicator = page.locator('[data-testid="back-to-top-progress"] circle[data-progress]');
    const circumference = 2 * Math.PI * 20;
    await expect(indicator).toHaveAttribute("stroke-dasharray", String(circumference));

    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect
      .poll(() => indicator.evaluate((el) => Number(el.getAttribute("stroke-dashoffset"))), {
        timeout: 5_000,
      })
      .toBeLessThan(circumference / 2);
  });

  test("mobile drawer marks the active route with aria-current and gold highlight", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHash(page, "/serve");
    await page.click('button[aria-label="Open menu"]');
    const drawer = page.getByRole("navigation", { name: "Mobile" });
    const serveLink = drawer.getByRole("link", { name: "Serve" });
    await expect(serveLink).toHaveAttribute("aria-current", "page");
    await expect(serveLink).toHaveCSS("color", "rgb(226, 191, 114)");

    // Parent section current when a child route is active — mobile drawer renders parent as link (not button).
    await gotoHash(page, "/history");
    await page.click('button[aria-label="Open menu"]');
    const aboutLink = drawer.getByRole("link", { name: /^About$/ });
    await expect(aboutLink).toHaveAttribute("aria-current", "page");
  });

  // Round-4 remediation (docs/code-review-audit-round3-2026-08-30.md L-5):
  // the mobile drawer is a modal dialog — dialog role, aria-modal, initial
  // focus on the panel, and a Tab/Shift+Tab focus trap.
  test("mobile drawer is a modal dialog with trapped focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHash(page, "/");

    await page.click('button[aria-label="Open menu"]');
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    // Initial focus lands on the dialog panel itself.
    await expect(dialog).toBeFocused();

    // Focus cannot escape the drawer: Tab from the last link wraps to the
    // first, Shift+Tab from the first wraps to the last.
    const links = dialog.getByRole("link");
    await links.last().focus();
    await page.keyboard.press("Tab");
    await expect(links.first()).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(links.last()).toBeFocused();

    // Escape restores focus to the hamburger toggle.
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});
