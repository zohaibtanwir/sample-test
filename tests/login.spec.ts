import { test, expect } from '../src/fixtures/auth.fixture';

test.describe('Login functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display login form', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await loginPage.expectError('Invalid credentials');
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login('user@example.com', 'password123');
    // After successful login, should redirect to home
    await expect(page).toHaveURL('/');
  });
});
