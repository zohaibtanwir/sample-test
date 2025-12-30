import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    }

    async isWelcomeMessageVisible(): Promise<boolean> {
        return await this.welcomeMessage.isVisible();
    }

    async getWelcomeMessageText(): Promise<string> {
        return await this.welcomeMessage.textContent() || '';
    }
}