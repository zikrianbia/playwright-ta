import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';

/**
 * Auth setup files — store session state per user role to avoid re-login
 */
const AUTH_DIR = path.resolve(__dirname, '../.auth');

export const AUTH_FILES = {
    e2iSuperadmin: path.join(AUTH_DIR, 'e2i-superadmin.json'),
    e2iJobOwner: path.join(AUTH_DIR, 'e2i-jobowner.json'),
    partnerAdmin: path.join(AUTH_DIR, 'partner-admin.json'),
    googleSuperadmin: path.join(AUTH_DIR, 'google-superadmin.json'),
    jobtechSuperadmin: path.join(AUTH_DIR, 'jobtech-superadmin.json'),
    jobtechJobOwner: path.join(AUTH_DIR, 'jobtech-jobowner.json'),
} as const;

/**
 * Helper: authenticate and save storage state
 */
async function authenticateAndSave(
    page: any,
    email: string,
    password: string,
    storageStatePath: string
): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.loginAndWaitForDashboard(email, password);
    await page.context().storageState({ path: storageStatePath });
}

// ──────────────────────────────────────────────
// Setup projects — run before tests to create auth state
// Enable these by uncommenting the dependencies in playwright.config.ts
// ──────────────────────────────────────────────

setup('authenticate as E2I Superadmin', async ({ page }) => {
    await authenticateAndSave(
        page,
        process.env.E2I_SUPERADMIN_EMAIL!,
        process.env.DEFAULT_PASSWORD!,
        AUTH_FILES.e2iSuperadmin
    );
});

setup('authenticate as Partner Admin', async ({ page }) => {
    await authenticateAndSave(
        page,
        process.env.PARTNER_ADMIN_EMAIL!,
        process.env.DEFAULT_PASSWORD!,
        AUTH_FILES.partnerAdmin
    );
});

setup('authenticate as Google Superadmin', async ({ page }) => {
    await authenticateAndSave(
        page,
        process.env.GOOGLE_SUPERADMIN_EMAIL!,
        process.env.DEFAULT_PASSWORD!,
        AUTH_FILES.googleSuperadmin
    );
});

setup('authenticate as JobTech Superadmin', async ({ page }) => {
    await authenticateAndSave(
        page,
        process.env.JOBTECH_SUPERADMIN_EMAIL!,
        process.env.DEFAULT_PASSWORD!,
        AUTH_FILES.jobtechSuperadmin
    );
});
