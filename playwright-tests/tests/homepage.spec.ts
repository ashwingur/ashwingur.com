import { test, expect } from "@playwright/test";

test("Home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Ashwin Gur");
});

test("Correct headings", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "About Me", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "About this Website", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Apps and Pages", level: 2 }),
  ).toBeVisible();
});

test("Should display github, LinkedIn and resume links", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.locator('a[href="https://github.com/ashwingur"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      'a[href="https://www.linkedin.com/in/ashwingur/?originalSubdomain=au"]',
    ),
  ).toBeVisible();
  await expect(page.locator('a[href="/Resume.pdf"]')).toBeVisible();
});
