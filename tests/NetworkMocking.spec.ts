// NetworkMocking.spec.ts
import { test, expect } from "../fixtures/bookFixtures";
import {routes} from "../Constants/routes"

test.describe("Network Mocking", () => {

  test("Mock Books API with custom books and verify UI", async ({ page, bookMocks }) => {
    await bookMocks.mockValidBooksResponse();
    await page.goto(routes.book);

    await expect(page.getByText("Rohan Bhagwat")).toBeVisible();
    await expect(page.getByText("Rahul Gupta")).toBeVisible();
  });

  test("Mock empty response and verify behavior", async ({ page, bookMocks }) => {
    await bookMocks.mockEmptyBooksResponse();
    await page.goto(routes.book);

    await expect(page.locator(".rt-tr-group")).toHaveCount(0);
  });

  test("Delay API response and handle", async ({ page, bookMocks }) => {
    await bookMocks.mockDelayedBooksResponse(3000);
    await page.goto(routes.book);

    await expect(page.getByText("Rohan Bhagwat")).toBeVisible();
  });
});