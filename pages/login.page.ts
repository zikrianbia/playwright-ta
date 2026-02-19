import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../utils/constants';

/**
 * Page Object Model for the Login page
 * URL: /login
 * Page title: "Sign in | Talented"
 */
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Actual UAT selectors (verified)
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('#kt_login_signin_submit');
        this.errorMessage = page.locator('.error-message, [role="alert"], .alert');
        this.forgotPasswordLink = page.locator('text=Forgot password?');
    }

    /**
     * Navigate to the login page
     */
    async goto(): Promise<void> {
        await this.page.goto(URLS.LOGIN);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Login with email and password
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Perform full login flow and wait for navigation away from /login
     */
    async loginAndWaitForDashboard(email: string, password: string): Promise<void> {
        await this.goto();
        await this.login(email, password);
        // Wait for redirect away from login page — URL should no longer contain /login
        await this.page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify the login page loaded correctly
     */
    async expectLoginPageVisible(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    /**
     * Verify that an error message is displayed
     */
    async expectError(errorText?: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        if (errorText) {
            await expect(this.errorMessage).toContainText(errorText);
        }
    }

    /**
     * Verify successfully redirected away from login page
     */
    async expectLoggedIn(): Promise<void> {
        await expect(this.page).not.toHaveURL(/\/login/);
    }
}
