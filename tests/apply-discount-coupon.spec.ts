import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Cart and Checkout', () => {
  test('should apply discount coupon', async ({ cartPage, page }) => {
    await cartPage.goto();
    
    await cartPage.addItemToCart('Blue T-Shirt', '$29.99', 2);
    await cartPage.addItemToCart('Black Jeans', '$59.99', 1);
    
    await cartPage.applyCoupon('SAVE20');
    
    await expect(cartPage.discountSection).toBeVisible();
    await expect(cartPage.discountPercentage).toContainText('20%');
    await expect(cartPage.totalAmount).toContainText('$95.97');
  });

  test('should validate shipping address', async ({ checkoutPage, page }) => {
    await checkoutPage.goto();
    
    await checkoutPage.enterShippingAddress({
      street: '123 Main St',
      city: 'New York',
      zip: '10001'
    });
    
    await expect(checkoutPage.addressValidationMessage).toBeVisible();
    await expect(checkoutPage.shippingOptions).toBeVisible();
  });
});