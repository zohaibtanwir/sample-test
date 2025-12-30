import { Page, Locator } from '@playwright/test';

/**
 * Base page class with common functionality for all page objects.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page URL.
   */
  abstract goto(): Promise<void>;

  /**
   * Wait for the page to be fully loaded.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element by data-testid attribute.
   */
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Take a screenshot with a descriptive name.
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
