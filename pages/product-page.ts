import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly confirmationMessage: Locator;
    readonly cartItemCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-testid="add-to-cart-button"]');
        this.confirmationMessage = page.locator('[data-testid="cart-confirmation-message"]');
        this.cartItemCount = page.locator('[data-testid="cart-item-count"]');
    }

    async addItemToCart() {
        await this.addToCartButton.click();
    }

    async getConfirmationMessage(): Promise<string> {
        return await this.confirmationMessage.textContent() || '';
    }

    async isItemAddedToCart(): Promise<boolean> {
        await this.confirmationMessage.waitFor({ state: 'visible' });
        const message = await this.getConfirmationMessage();
        return message.length > 0;
    }
}