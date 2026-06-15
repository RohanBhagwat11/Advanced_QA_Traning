// fixtures/baseFixtures.ts
import { test as base } from "@playwright/test";
import { BookMockUtils } from "../utils/mockBookUtils";

type MyFixtures = {
  bookMocks: BookMockUtils;
};

export const test = base.extend<MyFixtures>({
  bookMocks: async ({ page }, use) => {
    const mocks = new BookMockUtils(page);
    await use(mocks);
  },
});

export { expect } from "@playwright/test";