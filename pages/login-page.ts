import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly emailValidationError: Locator;
    readonly passwordValidationError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-testid="email-input"]');
        this.passwordInput = page.locator('[data-testid="password-input"]');
        this.loginButton = page.locator('[data-testid="login-button"]');
        this.errorMessage = page.locator('[data-testid="error-message"]');
        this.emailValidationError = page.locator('[data-testid="email-validation-error"]');
        this.passwordValidationError = page.locator('[data-testid="password-validation-error"]');
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getValidationError(field: string) {
        if (field === 'email') {
            return await this.emailValidationError.textContent();
        } else if (field === 'password') {
            return await this.passwordValidationError.textContent();
        }
        return null;
    }

    async isOnLoginPage() {
        return await this.loginButton.isVisible();
    }
}