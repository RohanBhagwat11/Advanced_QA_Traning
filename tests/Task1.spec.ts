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