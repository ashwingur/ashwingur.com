import { test as base, expect, Page } from "@playwright/test";

type MyFixtures = {
  login: (
    username?: string,
    password?: string,
    expectHomepageRedirect?: boolean,
  ) => Promise<void>;
};

const test = base.extend<MyFixtures>({
  login: async ({ page }, use) => {
    /**
     * Logs a user into the application. If not expecting a redirect to home page, set expectHomepageRedirect=false and await your expected page redirect.
     * Navigates to the login page, fills credentials, clicks login,
     * and asserts successful cookie presence.
     * Optionally asserts successful redirection to the homepage.
     * Uses environment variables TEST_USERNAME and TEST_PASSWORD by default.
     * @param {string} [username_param] - Optional. The username to use for login. Defaults to process.env.TEST_USERNAME.
     * @param {string} [password_param] - Optional. The password to use for login. Defaults to process.env.TEST_PASSWORD.
     * @param {boolean} [expectHomepageRedirect=true] - Optional. If true, asserts that the page redirects to the homepage ('/'). Defaults to true.
     * @returns {Promise<void>} A promise that resolves when login is successful and page is ready.
     */
    const loginFunction = async (
      username_param?: string,
      password_param?: string,
      expectHomepageRedirect: boolean = true, // Set default value to true here
    ) => {
      const username = username_param || process.env.TEST_USERNAME;
      const password = password_param || process.env.TEST_PASSWORD;

      // Basic validation for credentials
      if (!username || !password) {
        throw new Error(
          "TEST_USERNAME or TEST_PASSWORD environment variables are not set, or not provided to login function.",
        );
      }

      await page.goto("/Login");

      await page.getByPlaceholder("Username").fill(username);
      await page.getByPlaceholder("Password").fill(password);
      await page.getByRole("button", { name: "Login" }).click();

      // Assert that the session cookie is set
      await expect(async () => {
        const cookies = await page.context().cookies();
        const sessionCookie = cookies.find(
          (cookie) => cookie.name === "session",
        );
        expect(sessionCookie).toBeDefined();
        expect(sessionCookie?.value).not.toBe("");
        expect(sessionCookie?.value).not.toBeNull();
      }).toPass({
        timeout: 10000, // Wait up to 10 seconds for the cookie
      });

      // If login function is called at start, the app should by default redirect to homepage because prev page doesn't exist
      if (expectHomepageRedirect) {
        await expect(page).toHaveURL("/");
      }
    };

    await use(loginFunction);
  },
});

export { expect, test };
