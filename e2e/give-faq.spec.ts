import { expect, test } from "@playwright/test";

test.describe("Give + FAQ + Worship journeys", () => {
  test("Give alias routes both show 8 options", async ({ page }) => {
    await page.goto("/#/give");
    await expect(page.getByRole("heading", { name: /Sharing what you have/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /How to give/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "PayNow" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Weekend collections" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Church Maintenance Fund" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Poor & Needy Fund" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "General Church Offering" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mass offerings" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cheque" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Cash at Reception/i })).toBeVisible();

    await page.goto("/#/donate");
    await expect(page.getByRole("heading", { name: /Sharing what you have/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "PayNow" })).toBeVisible();
  });

  test("FAQ accordion single-open with aria", async ({ page }) => {
    await page.goto("/#/faq");
    await expect(page.getByRole("heading", { name: /A few things people ask/i })).toBeVisible();

    const firstQuestion = page.getByRole("button", { name: /What are the Mass times\?/i });
    const secondQuestion = page.getByRole("button", { name: /When can I go to confession\?/i });

    await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "false");

    // Animated collapse: open panel visible, closed panel collapsed to zero height.
    const panels = page.getByRole("region", { includeHidden: true });
    await expect(panels.nth(0)).toBeVisible();
    await expect(panels.nth(1)).toBeHidden();

    await secondQuestion.click();
    await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    await expect(panels.nth(1)).toBeVisible();
    await expect(panels.nth(0)).toBeHidden();
  });

  test("Worship Find Us and maps", async ({ page }) => {
    await page.goto("/#/worship");
    await expect(page.getByRole("heading", { name: /Mass, mercy/i }).first()).toBeVisible();

    await expect(page.locator("#mass")).toBeVisible();
    await expect(page.locator("#confession")).toBeVisible();
    await expect(page.locator("#visit")).toBeVisible();

    await expect(page.getByText("Weekday", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Reconciliation", { exact: false }).first()).toBeVisible();

    await expect(page.getByRole("heading", { name: /The hill in Bukit Batok/i }).first()).toBeVisible();
    await expect(page.getByText(/Reception/i).first()).toBeVisible();
    await expect(page.getByText(/Bukit Batok/i).first()).toBeVisible();

    const directions = page.getByRole("link", { name: /Open in Google Maps/i }).first();
    await expect(directions).toHaveAttribute("href", /google\.com\/maps/);

    const iframe = page.locator('iframe[title="Map of Church of St Mary of the Angels"]');
    await expect(iframe).toBeAttached();
    await expect(iframe).toHaveAttribute("src", /google\.com\/maps/);
  });

  test("Footer Give link from home navigates to /give", async ({ page }) => {
    await page.goto("/#/");

    await page.getByRole("navigation", { name: "Get involved" }).getByRole("link", { name: /^Give$/ }).click();
    await expect(page).toHaveURL(/#\/give/);
    await expect(page.getByText(/How to give/i)).toBeVisible();
  });
});
