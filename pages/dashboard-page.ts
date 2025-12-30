import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    }

    async getWelcomeMessage() {
        return await this.welcomeMessage.textContent();
    }

    async isOnDashboard() {
        return await this.welcomeMessage.isVisible();
    }
}