import { test, Page, expect } from "@playwright/test";
import { BrowserPage } from "../pages/BrowserWIndowPage";

test.describe("Browser Windows Test", () => {
  test("verify new tab button open new Tab", async ({ page }) => {
    const browerPage = new BrowserPage(page);
    await browerPage.goto();
    const newTab = await browerPage.openNewTab();
    await expect(newTab).toHaveURL("https://demoqa.com/sample");
  });

  test("Verify content of newly open tab", async ({ page }) => {
    const browserPage = new BrowserPage(page);
    await browserPage.goto();

    const newTab = await browserPage.openNewTab();

    await expect(newTab.locator("#sampleHeading")).toHaveText(
      "This is a sample page",
    );
  });

  test("Close child tab and switch back to parent.", async ({ page }) => {
    const browserPage = new BrowserPage(page);
    await browserPage.goto();

    const childTab = await browserPage.openNewTab();
    await childTab.close();

    await page.bringToFront();

    await expect(page.locator(".text-center")).toHaveText("Browser Windows");
  });

  test("Verify New Window Message functionality.", async ({ page }) => {
    const browserPage = new BrowserPage(page);
    await browserPage.goto();

    const newWindowMsg = await browserPage.openNewWindowMsg();
    await expect(newWindowMsg.locator("body")).toHaveText(
      "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
    );

    await newWindowMsg.close();
  });
});
