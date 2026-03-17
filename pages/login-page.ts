import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-testid="email-input"]');
        this.passwordInput = page.locator('[data-testid="password-input"]');
        this.signInButton = page.locator('[data-testid="sign-in-button"]');
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }
}