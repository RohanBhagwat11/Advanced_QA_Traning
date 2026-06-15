import { Page, Locator } from "@playwright/test";
import { routes } from "../Constants/routes";
export class BrowserPage {
  readonly page: Page;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly newWindowMsgButton: Locator;

  constructor(page: Page) {
    ((this.page = page),
      (this.newTabButton = page.locator("#tabButton")),
      (this.newWindowButton = page.locator("#windowButton")),
      (this.newWindowMsgButton = page.locator("#messageWindowButton")));
  }

  async goto() {
    await this.page.goto(routes.newWindow);
  }

  async openNewTab() {
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.newTabButton.click(),
    ]);

    return newTab;
  }

  async openNewWindow() {
    const [newWindow] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.newWindowButton.click(),
    ]);
    return newWindow;
  }

  async openNewWindowMsg() {
    const [newWindowMsg] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.newWindowMsgButton.click(),
    ]);
    return newWindowMsg;
  }
}
