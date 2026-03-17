import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Women\'s Tops PLP - Size Filter Preferences', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should show saved size filter applied for logged-in customer', async ({ loginPage, navigationPage, womensTopsPlpPage, page }) => {
    await loginPage.enterEmail('testuser@macys.com');
    await loginPage.enterPassword('Test@1234');
    await loginPage.clickSignInButton();
    
    await navigationPage.navigateToWomensTops();
    
    await expect(womensTopsPlpPage.getSizeFilter('M')).toBeChecked();
    await expect(womensTopsPlpPage.productGrid).toBeVisible();
    await expect(womensTopsPlpPage.getProductsWithSize('M')).toHaveCount({ min: 1 });
  });

  test('should allow customer to override size filter for current session', async ({ loginPage, navigationPage, womensTopsPlpPage, page }) => {
    await loginPage.enterEmail('testuser@macys.com');
    await loginPage.enterPassword('Test@1234');
    await loginPage.clickSignInButton();
    
    await navigationPage.navigateToWomensTops();
    
    await womensTopsPlpPage.deselectSizeFilter('M');
    await womensTopsPlpPage.selectSizeFilter('L');
    
    await expect(womensTopsPlpPage.productGrid).toBeVisible();
    await expect(womensTopsPlpPage.getProductsWithSize('L')).toHaveCount({ min: 1 });
    await expect(womensTopsPlpPage.getSavedProfilePreference()).toContainText('M');
  });

  test('should display Notify Me badge for out of stock items in saved size', async ({ loginPage, navigationPage, womensTopsPlpPage, page }) => {
    await loginPage.enterEmail('testuser@macys.com');
    await loginPage.enterPassword('Test@1234');
    await loginPage.clickSignInButton();
    
    await navigationPage.navigateToWomensTops();
    
    const outOfStockProducts = womensTopsPlpPage.getOutOfStockProductsInSize('S');
    await expect(outOfStockProducts.first()).toBeVisible();
    await expect(womensTopsPlpPage.getNotifyMeBadge(outOfStockProducts.first())).toBeVisible();
    await expect(outOfStockProducts.first()).toBeVisible();
  });
});