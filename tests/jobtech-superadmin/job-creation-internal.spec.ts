import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * JobTech Superadmin (Grace) — Internal-Only Job Creation
 * Posts Internal-only jobs → no approval needed.
 */
test.describe('JobTech Superadmin - Job Creation (Internal Only)', () => {

    test('selecting only Internal channel and submitting skips approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('job is immediately visible in JobTech workspace', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal Matches tab is accessible', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('E2I and External tabs are disabled/show "not published"', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
