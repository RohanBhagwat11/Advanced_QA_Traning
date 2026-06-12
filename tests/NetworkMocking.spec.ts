import { test, expect } from "@playwright/test";

// Mock Books API with custom books and verify UI
test("Mock Books API with custom books", async ({ page }) => {
  await page.route("**/BookStore/v1/Books", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
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
      }),
    });
  });

  await page.goto("https://demoqa.com/books");

  await expect(page.getByText("Rohan Bhagwat")).toBeVisible();
  await expect(page.getByText("Rahul Gupta")).toBeVisible();
});

//  Mock empty response and verify behavior.

test("Mock empty response", async ({ page }) => {
  await page.route("**/BookStore/v1/Books", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        books: [],
      }),
    });
  });

  await page.goto("https://demoqa.com/books");

  await expect(page.locator(".rt-tr-group")).toHaveCount(0);
});

//Delay API response and handle the loading state

test("Delay API response and handle", async ({ page }) => {
  await page.route("**/BookStore/v1/Books", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
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
      }),
    });
  });

  await page.goto("https://demoqa.com/books");

  await expect(page.getByText("Rohan Bhagwat")).toBeVisible();
});
