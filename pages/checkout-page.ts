import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly streetAddressInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly addressValidationMessage: Locator;
    readonly shippingOptionsContainer: Locator;
    readonly shippingOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.streetAddressInput = page.locator('[data-testid="street-address"]');
        this.cityInput = page.locator('[data-testid="city"]');
        this.zipCodeInput = page.locator('[data-testid="zip-code"]');
        this.addressValidationMessage = page.locator('[data-testid="address-validation"]');
        this.shippingOptionsContainer = page.locator('[data-testid="shipping-options"]');
        this.shippingOption = page.locator('[data-testid="shipping-option"]');
    }

    async navigateToCheckout() {
        await this.page.goto('/checkout');
    }

    async fillShippingAddress(address: {street: string, city: string, zip: string}) {
        await this.streetAddressInput.fill(address.street);
        await this.cityInput.fill(address.city);
        await this.zipCodeInput.fill(address.zip);
    }

    async isAddressValidated() {
        return await this.addressValidationMessage.isVisible();
    }

    async getShippingOptions() {
        return await this.shippingOption.all();
    }
}