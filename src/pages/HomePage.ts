import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home page object for the main landing page.
 */
export class HomePage extends BasePage {
  // Locators
  readonly heading: Locator;
  readonly navigationMenu: Locator;
  readonly searchInput: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.navigationMenu = page.getByRole('navigation');
    this.searchInput = page.getByPlaceholder('Search');
    this.userMenu = page.getByTestId('user-menu');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForLoad();
  }

  /**
   * Search for a term.
   */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  /**
   * Assert the page heading.
   */
  async expectHeading(text: string): Promise<void> {
    await expect(this.heading).toContainText(text);
  }

  /**
   * Check if user is logged in.
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }
}
