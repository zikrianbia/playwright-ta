import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * JobTech Superadmin (Grace) — E2I-Only Job Creation
 * Posts E2I-only jobs → requires E2I approval.
 */
test.describe('JobTech Superadmin - Job Creation (E2I Only)', () => {

    test('Employer field is pre-filled as "JobTech" and disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Hiring Manager and Job Owner fields are pre-filled and disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('all three channels are enabled (E2I, Internal, External)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('selecting only E2I channel and submitting creates "Pending Approval" job', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('pending E2I job appears in E2I approval list', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('pending E2I job not visible as active in JobTech workspace', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('pending approval banner shown on job detail', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('only About the Job tab visible while pending', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('after E2I approval: About Job visible, Jobseeker Matches disabled (E2I exclusive)', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('after E2I approval: Internal/External Matches show "not published" message', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });

    test('Applicants tab visible and initially empty after approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
