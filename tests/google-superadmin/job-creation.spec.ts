import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * Google Superadmin (Super admin TA) — Job Creation
 * Posts TM jobs (no approval needed). E2I channel disabled.
 */
test.describe('Google Superadmin - Job Creation', () => {

    test('Employer field is pre-filled as "Google" and disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Hiring Manager field is pre-filled and disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Job Owner field is pre-filled and disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('E2I channel is visible but disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal Employees channel is enabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('External Talents channel is enabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can select both Internal and External channels', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('job is created without approval and visible immediately', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
