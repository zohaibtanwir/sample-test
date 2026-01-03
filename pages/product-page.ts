import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-testid="add-to-cart-button"]');
        this.confirmationMessage = page.locator('[data-testid="cart-confirmation-message"]');
    }

    async addItemToCart() {
        await this.addToCartButton.click();
    }

    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

    async isConfirmationMessageVisible() {
        return await this.confirmationMessage.isVisible();
    }
}