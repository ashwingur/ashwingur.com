import { test, expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test("should allow a user to log in successfully", async ({ page }) => {
    await page.goto("/");
  });
});
