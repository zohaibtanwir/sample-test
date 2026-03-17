import { Page, Locator } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;
    readonly womensTopsLink: Locator;
    readonly mainNavigation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.womensTopsLink = page.locator('[data-testid="womens-tops-nav"]');
        this.mainNavigation = page.locator('[data-testid="main-navigation"]');
    }

    async navigateToWomensTops() {
        await this.womensTopsLink.click();
    }
}