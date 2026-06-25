// utils/BookMockUtils.ts
import { Page } from "@playwright/test";
import { mockBookData } from "../Constants/mockdata";

export class BookMockUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Mock successful response with custom data
  async mockValidBooksResponse(customData = mockBookData) {
    await this.page.route("**/BookStore/v1/Books", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(customData),
      });
    });
  }

  // Mock empty response
  async mockEmptyBooksResponse() {
    await this.page.route("**/BookStore/v1/Books", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ books: [] }),
      });
    });
  }

  // Mock delayed response
  async mockDelayedBooksResponse(delayMs: number) {
    await this.page.route("**/BookStore/v1/Books", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockBookData),
      });
    });
  }
}
