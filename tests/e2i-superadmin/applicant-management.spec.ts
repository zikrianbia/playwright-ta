import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * E2I Superadmin (Grace e2i) — Applicant Management
 * Reviews applicants, updates statuses, shortlists to partners.
 */
test.describe('E2I Superadmin - Applicant Management', () => {

    test('Applicants tab is visible on job detail', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('applicant appears with status "Applied"', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can update applicant status to "Reviewed"', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('can shortlist applicant — referred to partner employer', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('shortlisted applicant visible in E2I Applicants tab', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('applicant status becomes read-only after partner takes ownership', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('final status reflected in E2I workspace after partner decision', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
