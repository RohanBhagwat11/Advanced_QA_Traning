//import { test, Page, expect } from "@playwright/test";
//import { BrowserPage } from "../pages/BrowserWIndowPage";
import { test, expect } from "../fixtures/windowFixtures"; 
import {routes} from "../Constants/routes"


test.describe("Browser Windows Test", () => {
  test("verify new tab button open new Tab", async ({ browserPage }) => {

    const newTab = await browserPage.openNewTab();
    await expect(newTab).toHaveURL(routes.sample);
  });

  test("Verify content of newly open tab", async ({ browserPage }) => {

    const newTab = await browserPage.openNewTab();

    await expect(newTab.locator("#sampleHeading")).toHaveText(
      "This is a sample page",
    );
  });

  test("Close child tab and switch back to parent.", async ({ browserPage, page }) => {
    
    const childTab = await browserPage.openNewTab();
    await childTab.close();

    await expect(page.locator(".text-center")).toHaveText("Browser Windows");
  });

  test("Verify New Window Message functionality.", async ({ browserPage }) => {

    const newWindowMsg = await browserPage.openNewWindowMsg();
    await expect(newWindowMsg.locator("body")).toHaveText(
      "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
    );

    await newWindowMsg.close();
  });
});
