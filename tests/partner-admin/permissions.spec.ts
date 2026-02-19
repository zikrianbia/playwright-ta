import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * Partner Admin (Shannon Stone) — Test Hiring Enterprise 2 — Permissions
 * Partner workspace restrictions.
 */
test.describe('Partner Admin - Permissions', () => {

    test('cannot edit ownership fields (Employer, Hiring Manager, Job Owner)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can only publish to E2I channel', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('sees pending approval banner, no tabs accessible while pending', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('sees rejection message and reason when rejected', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('approved job shows restricted tabs (About Job, Applicants only)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Jobseeker Matches tab is not visible to partner', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
