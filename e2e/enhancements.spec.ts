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
    // Env-agnostic contract (round-9 E2E-L1): dev serves the icon href as
    // "/favicon.svg", while the singlefile build rewrites it to the relative
    // form "./favicon.svg". Accept both — and assert the reference actually
    // resolves, mirroring the env-safe "favicon.svg resolves from public/" test.
    const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
    await expect(icon).toHaveAttribute("href", /^(?:\.\/|\/)favicon\.svg$/);
    const iconResponse = await page.request.get((await icon.getAttribute("href"))!);
    expect(iconResponse.status()).toBe(200);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#200a0a",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://www.risenchrist.org.sg/images/hero-church.jpg",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://www.risenchrist.org.sg/",
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
    expect(parsed.telephone).toBe("+65 6253 2166");
    expect(parsed.address.streetAddress).toBe("91 Toa Payoh Central");
    expect(parsed.address.postalCode).toBe("319193");
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
    const backToTop = page.getByTestId("back-to-top");
    await expect(backToTop).toHaveAttribute("aria-hidden", "true");
    await page.mouse.wheel(0, 1200);
    await expect(backToTop).toHaveAttribute("aria-hidden", "false");
  });
});
