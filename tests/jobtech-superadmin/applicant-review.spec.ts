import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * JobTech Superadmin (Grace) — Applicant Review
 * Reviews applicants from all channels (E2I shortlisted, internal, external).
 */
test.describe('JobTech Superadmin - Applicant Review', () => {

    test('E2I-only job: receives shortlisted applicants from E2I', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('shortlisted applicant status shows "Shortlisted"', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can change status to "Keep In View" — takes ownership from E2I', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can finalize outcome as "Successful" or "Unsuccessful"', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Internal-only job: manages applicants independently', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Mixed channel job: applicants from all sources with source badges', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('final status reflected across workspaces', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
