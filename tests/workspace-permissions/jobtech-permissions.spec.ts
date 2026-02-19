import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * 1D. JobTech (TM & E2I Partner) - Workspace Visibility & Permissions
 */

test.describe('1D. JobTech (TM & E2I Partner) - Permissions', () => {

    test('JobTech cannot edit ownership fields', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('JobTech can select all channels', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    // Single Channel - E2I Only
    test('E2I-only job requires approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Approved E2I-only job: Jobseeker tab disabled, others disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    // Single Channel - Internal Only
    test('Internal-only job skips approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal-only job: Internal tab accessible, others disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    // Single Channel - External Only
    test('External match locked, unlock prompt shown when matches exist', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Unlock prompt hidden when no external matches', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    // Dual Channel
    test('Internal + External: both tabs accessible', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('E2I rejection does not block TM channels', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    // All Channels
    test('All channels: all match tabs visible, Jobseeker read-only', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
