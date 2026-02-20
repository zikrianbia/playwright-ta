import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * E2I Superadmin (Grace e2i) — Job Approval
 * Approves or rejects jobs submitted by partner employers & JobTech.
 */
test.describe('E2I Superadmin - Job Approval', () => {

    test('can navigate to Job Posting Approval list from TA dashboard', async ({ loginAs, talentAttractionPage, jobApprovalPage }) => {
        await loginAs(ACCOUNTS.e2i.superadmin);

        await talentAttractionPage.goto();
        await talentAttractionPage.clickReviewApprovalRequest();

        await expect(jobApprovalPage.tableTitle).toBeVisible();
    });

    test('can see pending jobs and approve one', async ({ loginAs, jobApprovalPage }) => {
        await loginAs(ACCOUNTS.e2i.superadmin);

        // Go directly to the pending approval page
        await jobApprovalPage.goto();

        const count = await jobApprovalPage.getPendingJobCount();
        console.log(`Found ${count} pending jobs`);

        if (count > 0) {
            // Get the title of the first pending job
            const firstJobRow = jobApprovalPage.jobRows.first();
            const jobTitle = await firstJobRow.locator('span, div').first().innerText();
            console.log(`Approving job: ${jobTitle}`);

            await jobApprovalPage.approveJob(jobTitle);

            // Verify it's no longer in the list (or at least that the row is gone)
            await expect(jobApprovalPage.getRowByJobTitle(jobTitle)).not.toBeVisible({ timeout: 10000 });
        } else {
            console.log('No pending jobs found to approve.');
        }
    });

    test('can reject a pending partner job', async ({ loginAs, jobApprovalPage }) => {
        await loginAs(ACCOUNTS.e2i.superadmin);
        await jobApprovalPage.goto();

        const count = await jobApprovalPage.getPendingJobCount();
        if (count > 1) { // Prefer having at least 2 to try both approve and reject
            const jobRow = jobApprovalPage.jobRows.nth(1); // Try the second one if it exists
            const jobTitle = await jobRow.locator('span, div').first().innerText();
            console.log(`Rejecting job: ${jobTitle}`);

            await jobApprovalPage.rejectJob(jobTitle, 'Automated test rejection');

            await expect(jobApprovalPage.getRowByJobTitle(jobTitle)).not.toBeVisible({ timeout: 10000 });
        }
    });
});
