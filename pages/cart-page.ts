import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productItem: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly couponInput: Locator;
    readonly applyCouponButton: Locator;
    readonly discountAmount: Locator;
    readonly totalAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItem = page.locator('[data-testid="cart-item"]');
        this.productName = page.locator('[data-testid="product-name"]');
        this.productPrice = page.locator('[data-testid="product-price"]');
        this.productQuantity = page.locator('[data-testid="product-quantity"]');
        this.couponInput = page.locator('[data-testid="coupon-code-input"]');
        this.applyCouponButton = page.locator('[data-testid="apply-coupon-btn"]');
        this.discountAmount = page.locator('[data-testid="discount-amount"]');
        this.totalAmount = page.locator('[data-testid="total-amount"]');
    }

    async addItemToCart(product: string, price: string, quantity: number) {
        await this.productName.fill(product);
        await this.productPrice.fill(price);
        await this.productQuantity.fill(quantity.toString());
    }

    async applyCouponCode(couponCode: string) {
        await this.couponInput.fill(couponCode);
        await this.applyCouponButton.click();
    }

    async getDiscountAmount() {
        return await this.discountAmount.textContent();
    }

    async getTotalAmount() {
        return await this.totalAmount.textContent();
    }

    async verifyCartItems(expectedItems: Array<{product: string, price: string, qty: number}>) {
        const cartItems = await this.productItem.all();
        
        for (let i = 0; i < expectedItems.length; i++) {
            const item = cartItems[i];
            const productName = await item.locator('[data-testid="product-name"]').textContent();
            const productPrice = await item.locator('[data-testid="product-price"]').textContent();
            const productQuantity = await item.locator('[data-testid="product-quantity"]').inputValue();
            
            if (productName !== expectedItems[i].product ||
                productPrice !== expectedItems[i].price ||
                parseInt(productQuantity) !== expectedItems[i].qty) {
                throw new Error(`Cart item ${i} does not match expected values`);
            }
        }
    }
}