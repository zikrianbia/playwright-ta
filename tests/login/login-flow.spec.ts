import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';
import { LoginPage } from '../../pages/login.page';

/**
 * Login Flow Tests
 *
 * Verifies that all test accounts can successfully log in to the
 * BeTalented.ai UAT platform and are redirected away from /login.
 */

test.describe('Login Flow - Verify All Accounts', () => {

    test.beforeEach(async ({ page }) => {
        // Clear cookies/storage before each test to ensure clean login state
        await page.context().clearCookies();
    });

    // ── E2I Main Workspace ──

    test('E2I Superadmin (Grace e2i) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.e2i.superadmin;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    test('E2I Job Owner (Bob Ray) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.e2i.jobOwner;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    // ── Test Hiring Enterprise 2 (Partner) ──

    test('Partner Admin (Shannon Stone) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.partner.admin;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    // ── Google (TM Only) ──

    test('Google Superadmin (Super admin TA) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.google.superadmin;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    test('Google Job Owner + Partner Admin can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.google.jobOwner;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    // ── JobTech (TM & E2I Partner) ──

    test('JobTech Superadmin (Grace) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.jobtech.superadmin;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });

    test('JobTech Job Owner (Keith) can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const account = ACCOUNTS.jobtech.jobOwner;

        await loginPage.goto();
        await loginPage.expectLoginPageVisible();
        await loginPage.login(account.email, account.password);

        await page.waitForFunction(
            () => !window.location.pathname.includes('/login'),
            { timeout: 30000 }
        );
        await page.waitForLoadState('networkidle');
        await loginPage.expectLoggedIn();
    });


});
