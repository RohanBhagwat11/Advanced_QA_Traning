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
  
    const browserPage = new BrowserPage(page);
    
    await browserPage.goto();
    
 
    await use(browserPage);

  },
});

// Re-export expect so you can import everything from one file
export { expect } from "@playwright/test";
