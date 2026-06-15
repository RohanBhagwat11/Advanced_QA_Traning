// utils/BookMockUtils.ts
import { Page } from "@playwright/test";

export class BookMockUtils {
  private page: Page;

  // Standard dummy book data reused across tests
  public mockBookData = {
    books: [
      {
        isbn: "9781449331818",
        title: "Rohan Bhagwat",
        subTitle: "QA Trainee",
        author: "Rahul Gupta",
        publish_date: "2020-06-12T08:48:39.000Z",
        publisher: "Zeus Learning",
        pages: 234,
        description: "This is Dummy Data",
        website: "https://playwright.dev/python/",
      },
    ],
  };

  constructor(page: Page) {
    this.page = page;
  }

  // Mock successful response with custom data
  async mockValidBooksResponse(customData = this.mockBookData) {
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
        body: JSON.stringify(this.mockBookData),
      });
    });
  }
}