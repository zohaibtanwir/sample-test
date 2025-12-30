import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should display main heading', async ({ homePage }) => {
    await expect(homePage.heading).toBeVisible();
  });

  test('should have navigation menu', async ({ homePage }) => {
    await expect(homePage.navigationMenu).toBeVisible();
  });

  test('should allow searching', async ({ homePage, page }) => {
    await homePage.search('test query');
    await expect(page).toHaveURL(/search/);
  });
});
