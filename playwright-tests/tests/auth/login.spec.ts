// import { test, expect } from "@playwright/test";
import { expect, test } from "@playwright-tests/fixtures";

test.describe("Login Functionality", () => {
  test("should allow a user to log in from home successfully", async ({
    page,
    isMobile,
  }) => {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    // Ensure environment variables are loaded
    expect(username).toBeDefined();
    expect(password).toBeDefined();

    await page.goto("/");

    if (isMobile) {
      const hamburgerButton = page.getByRole("button", {
        name: "Toggle navigation menu",
      });
      await expect(hamburgerButton).toBeVisible();
      await hamburgerButton.click();
    }

    const loginLinkLocator = page.locator('a[href="/Login"]:visible');

    await expect(loginLinkLocator).toBeVisible();
    loginLinkLocator.click();

    await expect(page).toHaveURL("/Login");

    await page.getByPlaceholder("Username").fill(username!);
    await page.getByPlaceholder("Password").fill(password!);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should not allow an incorrect login", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      const hamburgerButton = page.getByRole("button", {
        name: "Toggle navigation menu",
      });
      await expect(hamburgerButton).toBeVisible();
      await hamburgerButton.click();
    }

    const loginLinkLocator = page.locator('a[href="/Login"]:visible');

    await expect(loginLinkLocator).toBeVisible();
    loginLinkLocator.click();

    await expect(page).toHaveURL("/Login");

    await page.getByPlaceholder("Username").fill("badusername");
    await page.getByPlaceholder("Password").fill("badpassword");
    await page.getByRole("button", { name: "Login" }).click();

    const errorMessage = page.getByText("Incorrect username or password");
    await expect(errorMessage).toBeVisible();
  });

  test("should allow a logout", async ({ page, isMobile, login }) => {
    await login(undefined, undefined);

    if (isMobile) {
      const hamburgerButton = page.getByRole("button", {
        name: "Toggle navigation menu",
      });
      await expect(hamburgerButton).toBeVisible();
      await hamburgerButton.click();
    }
    // await page.pause();

    const loginLinkLocator = page.locator('a[href="/Login"]:visible');

    await expect(loginLinkLocator).toBeVisible();
    loginLinkLocator.click();
    await expect(page).toHaveURL("/Login");
    await page.getByRole("button", { name: "Logout" }).click();
    // await expect(page).toHaveURL("/");
  });
});
