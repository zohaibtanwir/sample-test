import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Login Authentication', () => {
  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.goto();
    
    await loginPage.enterEmail('user@example.com');
    await loginPage.enterPassword('password123');
    await loginPage.clickLoginButton();
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.welcomeMessage).toContainText('Welcome');
  });

  test('should fail login with invalid password', async ({ loginPage, page }) => {
    await loginPage.goto();
    
    await loginPage.enterEmail('user@example.com');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLoginButton();
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should show validation errors with empty fields', async ({ loginPage, page }) => {
    await loginPage.goto();
    
    await loginPage.clickLoginButton();
    
    await expect(loginPage.emailValidationError).toBeVisible();
    await expect(loginPage.emailValidationError).toContainText('Email is required');
    await expect(loginPage.passwordValidationError).toBeVisible();
    await expect(loginPage.passwordValidationError).toContainText('Password is required');
  });
});