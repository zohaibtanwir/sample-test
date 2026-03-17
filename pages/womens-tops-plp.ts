import { Page, Locator } from '@playwright/test';

export class WomensTopsPlpPage {
    readonly page: Page;
    readonly sizeFilterPanel: Locator;
    readonly productGrid: Locator;
    readonly productItems: Locator;
    readonly notifyMeBadge: Locator;
    readonly productSizeInfo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sizeFilterPanel = page.locator('[data-testid="size-filter-panel"]');
        this.productGrid = page.locator('[data-testid="product-grid"]');
        this.productItems = page.locator('[data-testid="product-item"]');
        this.notifyMeBadge = page.locator('[data-testid="notify-me-badge"]');
        this.productSizeInfo = page.locator('[data-testid="product-size-info"]');
    }

    async navigate() {
        await this.page.goto('/womens-tops');
    }

    async isSizeFilterSelected(size: string): Promise<boolean> {
        const sizeFilter = this.page.locator(`[data-testid="size-filter-${size}"]`);
        return await sizeFilter.isChecked();
    }

    async selectSizeFilter(size: string) {
        const sizeFilter = this.page.locator(`[data-testid="size-filter-${size}"]`);
        if (!(await sizeFilter.isChecked())) {
            await sizeFilter.check();
        }
    }

    async deselectSizeFilter(size: string) {
        const sizeFilter = this.page.locator(`[data-testid="size-filter-${size}"]`);
        if (await sizeFilter.isChecked()) {
            await sizeFilter.uncheck();
        }
    }

    async getDisplayedProducts() {
        return await this.productItems.all();
    }

    async getProductsWithSize(size: string) {
        const products = await this.productItems.all();
        const productsWithSize = [];
        
        for (const product of products) {
            const sizeInfo = product.locator('[data-testid="product-size-info"]');
            const sizeText = await sizeInfo.textContent();
            if (sizeText && sizeText.includes(size)) {
                productsWithSize.push(product);
            }
        }
        
        return productsWithSize;
    }

    async hasNotifyMeBadge(productElement: Locator): Promise<boolean> {
        const badge = productElement.locator('[data-testid="notify-me-badge"]');
        return await badge.isVisible();
    }

    async waitForProductGridRefresh() {
        await this.productGrid.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }
}