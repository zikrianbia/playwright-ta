import { Page, expect } from '@playwright/test';

/**
 * Wait for a toast/notification message to appear and optionally verify its text
 */
export async function waitForToast(page: Page, expectedText?: string): Promise<void> {
    const toast = page.locator('[role="alert"], .toast, .notification, .Toastify__toast').first();
    await toast.waitFor({ state: 'visible', timeout: 10000 });
    if (expectedText) {
        await expect(toast).toContainText(expectedText);
    }
}

/**
 * Wait for page to finish loading (network idle + DOM content loaded)
 */
export async function waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
}

/**
 * Wait for a specific URL pattern to be loaded
 */
export async function waitForUrl(page: Page, urlPattern: string | RegExp): Promise<void> {
    await page.waitForURL(urlPattern, { timeout: 30000 });
}

/**
 * Take a labeled screenshot for debugging
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({
        path: `test-results/screenshots/${name}-${Date.now()}.png`,
        fullPage: true,
    });
}

/**
 * Retry an action with custom retry logic
 */
export async function retryAction(
    action: () => Promise<void>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await action();
            return;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
}

/**
 * Generate a unique job title for test isolation
 */
export function generateJobTitle(prefix: string = 'QA Test Job'): string {
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix} - ${timestamp} - ${random}`;
}
