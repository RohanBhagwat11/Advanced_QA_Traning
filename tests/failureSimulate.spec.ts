import { test, expect } from "@playwright/test";
import { routes } from "../Constants/routes";

test("Element not found failure", async ({ page }) => {
  await page.goto(routes.newWindow);
  await page.locator("#invalid-id").click();
});

test("Assertion failure", async ({ page }) => {
  await page.goto(routes.newWindow);

  const newTab = page.locator("#tabButton");
  await expect(newTab).toHaveText("Add Tab");
});

test("URL mismatch failure", async ({ page }) => {
  await page.goto(routes.newWindow);
  await expect(page).toHaveURL(routes.book);
});

test("Page close unexpectedly", async ({ page }) => {
  await page.goto(routes.newWindow);
  await page.close();

  const newTab = page.locator("#tabButton");
  await expect(newTab).toHaveText("New Tab");
});

test("Network failure", async ({ page }) => {
  await page.route("**/*", (route) => route.abort());
  await page.goto(routes.newWindow);
});

test("Wrong page Title Validation", async ({ page }) => {
  await page.goto(routes.newWindow);
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.click("#tabButton"),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle("Google");
});
