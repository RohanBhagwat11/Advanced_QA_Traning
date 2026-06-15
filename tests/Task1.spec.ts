/*
import {test, Page, expect} from '@playwright/test'

test('Verify New Tab Button opens a new tab ', async ({ page, context }) => {
    await page.goto("https://demoqa.com/browser-windows")

    const initialCount = await context.pages().length;
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "New Tab" }).click(),
    ]);

    await page.waitForLoadState()

    expect(context.pages().length).toBe(initialCount + 1)
    await expect(newTab).toHaveURL("https://demoqa.com/sample");
});

test('Verify content of newly opened tab', async({page, context})=>{
    await page.goto("https://demoqa.com/browser-windows")

    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "New Tab" }).click(),
    ]);

    await page.waitForLoadState()

   
    const heading = newTab.locator("#sampleHeading")
    await expect(heading).toHaveText("This is a sample page");
})

test('Close child tab and switch back to parent', async({page, context})=>{

     await page.goto("https://demoqa.com/browser-windows")

     const parentPage = page;

    
    const [childPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "New Tab" }).click(),
    ]);

    await page.waitForLoadState()

    const heading = childPage.locator("#sampleHeading")
    await expect(heading).toHaveText("This is a sample page");

    await childPage.close()

    await parentPage.bringToFront()
    await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();
} )



test('Verify new Window Message functionality', async({page, context})=>{
     await page.goto("https://demoqa.com/browser-windows")

     const parentPage = page

    const [messageWindow] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: "New Window Message" }).click(),
    ]);

    await messageWindow.waitForLoadState()

    const body = messageWindow.locator('body')
    await expect(body).toHaveText("Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.")

    await messageWindow.close()

    await parentPage.bringToFront()
    await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();


})

*/


// BrowserWindow.spec.ts
// Replace the default Playwright import with your custom fixture import
import { test, expect } from "../fixtures/fixtures"; 

test.describe("Browser Windows Test", () => {
  
  // Simply inject 'browserPage' (and 'page' when you need the parent context)
  test("verify new tab button open new Tab", async ({ browserPage }) => {
    const newTab = await browserPage.openNewTab();
    await expect(newTab).toHaveURL("https://demoqa.com/sample");
  });

  test("Verify content of newly open tab", async ({ browserPage }) => {
    const newTab = await browserPage.openNewTab();

    await expect(newTab.locator("#sampleHeading")).toHaveText(
      "This is a sample page",
    );
  });

  test("Close child tab and switch back to parent.", async ({ page, browserPage }) => {
    const childTab = await browserPage.openNewTab();
    await childTab.close();

    // You can still use the built-in 'page' alongside your custom fixture
    await page.bringToFront();
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