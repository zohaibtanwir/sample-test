import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username-input');
        this.passwordInput = page.getByTestId('password-input');
        this.loginButton = page.getByTestId('login-button');
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}