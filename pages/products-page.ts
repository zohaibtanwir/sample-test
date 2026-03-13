import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;
    readonly resultCount: Locator;
    readonly minPriceInput: Locator;
    readonly maxPriceInput: Locator;
    readonly applyFiltersButton: Locator;
    readonly sortDropdown: Locator;
    readonly productItems: Locator;
    readonly productPrices: Locator;
    readonly noResultsMessage: Locator;
    readonly clearSearchLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator('[data-testid="product-search-input"]');
        this.searchButton = page.locator('[data-testid="search-button"]');
        this.searchResults = page.locator('[data-testid="search-results"]');
        this.resultCount = page.locator('[data-testid="result-count"]');
        this.minPriceInput = page.locator('[data-testid="min-price-input"]');
        this.maxPriceInput = page.locator('[data-testid="max-price-input"]');
        this.applyFiltersButton = page.locator('[data-testid="apply-filters-button"]');
        this.sortDropdown = page.locator('[data-testid="sort-dropdown"]');
        this.productItems = page.locator('[data-testid="product-item"]');
        this.productPrices = page.locator('[data-testid="product-price"]');
        this.noResultsMessage = page.locator('[data-testid="no-results-message"]');
        this.clearSearchLink = page.locator('[data-testid="clear-search-link"]');
    }

    async navigate() {
        await this.page.goto('/products');
    }

    async searchForProduct(searchTerm: string) {
        await this.searchBar.fill(searchTerm);
        await this.searchButton.click();
    }

    async setPriceRange(minPrice: string, maxPrice: string) {
        await this.minPriceInput.fill(minPrice);
        await this.maxPriceInput.fill(maxPrice);
        await this.applyFiltersButton.click();
    }

    async sortProducts(sortOption: string) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async getSearchResults() {
        return this.productItems.all();
    }

    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
    }

    async verifySearchResultsContain(searchTerm: string) {
        const results = await this.getSearchResults();
        for (const result of results) {
            const text = await result.textContent();
            if (!text?.toLowerCase().includes(searchTerm.toLowerCase())) {
                throw new Error(`Search result does not contain "${searchTerm}"`);
            }
        }
    }

    async verifyPricesInRange(minPrice: number, maxPrice: number) {
        const prices = await this.getProductPrices();
        for (const price of prices) {
            if (price < minPrice || price > maxPrice) {
                throw new Error(`Price ${price} is not within range ${minPrice}-${maxPrice}`);
            }
        }
    }

    async verifyPricesSortedAscending() {
        const prices = await this.getProductPrices();
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < prices[i - 1]) {
                throw new Error('Prices are not sorted in ascending order');
            }
        }
    }

    async isNoResultsMessageVisible(): Promise<boolean> {
        return await this.noResultsMessage.isVisible();
    }

    async isClearSearchLinkVisible(): Promise<boolean> {
        return await this.clearSearchLink.isVisible();
    }

    async isResultCountDisplayed(): Promise<boolean> {
        return await this.resultCount.isVisible();
    }
}