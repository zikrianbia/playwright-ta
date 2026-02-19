import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * JobTech Superadmin (Grace) — Permissions
 * Mixed channel restrictions for TM & E2I Partner workspace.
 */
test.describe('JobTech Superadmin - Permissions', () => {

    test('cannot edit ownership fields (Employer, Manager, Owner)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can select all three channels (E2I, Internal, External)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('E2I-only job: Jobseeker tab disabled, other tabs disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal-only job: Internal tab accessible, others disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('External match locked, unlock prompt shown when matches exist', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('unlock prompt hidden when no external matches', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
