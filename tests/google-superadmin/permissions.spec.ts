import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * Google Superadmin (Super admin TA) — Permissions
 * TM-only channel restrictions.
 */
test.describe('Google Superadmin - Permissions', () => {

    test('sees only Google workspace jobs', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('ownership fields (Employer, Manager, Owner) are locked', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('E2I channel is disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal and External channels are enabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('job detail tabs correct for TM-only job', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal Match tab shown when Internal channel selected', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('External Match visible after unlocking', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
