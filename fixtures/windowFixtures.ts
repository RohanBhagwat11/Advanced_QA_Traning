// fixtures.ts
import { test as base } from "@playwright/test";
import { BrowserPage } from "../pages/BrowserWIndowPage"; // Adjust path as needed

// 1. Define the types for your custom fixtures
type MyFixtures = {
  browserPage: BrowserPage;
};

// 2. Extend the base test object
export const test = base.extend<MyFixtures>({
  browserPage: async ({ page }, use) => {
    // Instantiate the page object
    const browserPage = new BrowserPage(page);
    
    // Automatically navigate so the tests don't have to repeat it
    await browserPage.goto();
    
    // Pass the prepared instance to the test
    await use(browserPage);
    
    // (Optional) Add any teardown logic here if needed after 'use'
  },
});

// Re-export expect so you can import everything from one file
export { expect } from "@playwright/test";