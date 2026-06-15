import { test, Page, expect } from "@playwright/test";
import { routes } from "../Constants/routes";

test("Action Timeout", async ({ page }) => {
  {
    await page.goto(routes.newWindow);
    page.setDefaultTimeout(5000);
    await page.locator("#not-exist").click();
  }
});

test("Navigation Timeout", async ({ page }) => {
  await page.route("**/*", async (route) => {
    await new Promise((r) => setTimeout(r, 10000));
    await route.continue();
  });

  page.setDefaultNavigationTimeout(3000);

  await page.goto(routes.newWindow);
});

test("Expect Timeout", async ({ page }) => {
  await page.goto(routes.newWindow);
  await expect(page.locator("#tabButton")).toHaveText("Open New Tab", {
    timeout: 3000,
  });
});


