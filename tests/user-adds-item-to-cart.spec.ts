import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Product page', () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.goto();
  });

  test('should add item to cart', async ({ productPage }) => {
    await productPage.clickAddToCartButton();
    await expect(productPage.cartConfirmationMessage).toBeVisible();
    await expect(productPage.cartItemCount).toContainText('1');
  });
});