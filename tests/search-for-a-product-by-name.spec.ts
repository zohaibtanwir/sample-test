import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Products page', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test('should search for a product by name', async ({ productsPage }) => {
    await productsPage.searchFor('wireless headphones');
    await productsPage.clickSearchButton();
    
    await expect(productsPage.searchResults).toContainText('wireless headphones');
    await expect(productsPage.resultCount).toBeVisible();
  });

  test('should filter products by price range', async ({ productsPage }) => {
    await productsPage.setMinPrice('50');
    await productsPage.setMaxPrice('200');
    await productsPage.clickApplyFilters();
    
    await expect(productsPage.productPrices).toHavePriceRange(50, 200);
  });

  test('should sort products by price low to high', async ({ productsPage }) => {
    await productsPage.selectSortOption('Price: Low to High');
    
    await expect(productsPage.productPrices).toBeSortedAscending();
  });

  test('should show no results message when product not found', async ({ productsPage }) => {
    await productsPage.searchFor('xyznonexistentproduct');
    await productsPage.clickSearchButton();
    
    await expect(productsPage.noResultsMessage).toHaveText('No products found');
    await expect(productsPage.clearSearchLink).toBeVisible();
  });
});