import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Login page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.enterUsername('testuser@example.com');
    await loginPage.enterPassword('password123');
    await loginPage.clickLoginButton();
    
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });
});