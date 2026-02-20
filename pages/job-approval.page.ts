import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Job Approval page
 * Used by E2I admins to approve/reject partner jobs
 */
export class JobApprovalPage {
    readonly page: Page;
    readonly tableTitle: Locator;
    readonly jobRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tableTitle = page.locator('h1, h2').filter({ hasText: 'Job posting approval requests' });
        // The subagent found rows with id="row-0", "row-1" or role="row"
        this.jobRows = page.locator('div[role="row"], tr').filter({ has: page.locator('button:has-text("Approve")') });
    }

    /**
     * Navigate to the approval list page directly
     */
    async goto(): Promise<void> {
        await this.page.goto('/talentattraction/job-posting-approval-requests');
        await this.page.waitForLoadState('load');
        await this.waitForJobData();
    }

    /**
     * Wait for the job data to be loaded in the table
     */
    async waitForJobData(): Promise<void> {
        // Wait for either a row to be visible or the count text to appear
        try {
            await Promise.race([
                this.jobRows.first().waitFor({ state: 'visible', timeout: 10000 }),
                this.page.locator('text=pending approval jobs found').waitFor({ state: 'visible', timeout: 10000 })
            ]);
        } catch (e) {
            console.log('Wait for job data timed out or no jobs found');
        }
    }

    /**
     * Get a row for a specific job title
     */
    getRowByJobTitle(jobTitle: string): Locator {
        return this.page.locator('div[role="row"], tr').filter({ hasText: jobTitle });
    }

    /**
     * Approve a job
     */
    async approveJob(jobTitle: string): Promise<void> {
        const row = this.getRowByJobTitle(jobTitle);
        await expect(row).toBeVisible();
        await row.locator('button:has-text("Approve")').click();

        // Wait for confirmation modal - can be a dialog or a fixed overlay
        const modal = this.page.locator('div[role="dialog"], div.fixed.z-50').filter({ hasText: /Approve|Confirm/i }).last();
        if (await modal.isVisible({ timeout: 5000 })) {
            const confirmButton = modal.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Approve")').first();
            await confirmButton.click({ timeout: 5000 });
        }

        await this.page.waitForLoadState('load');
    }

    /**
     * Reject a job
     */
    async rejectJob(jobTitle: string, reason?: string): Promise<void> {
        const row = this.getRowByJobTitle(jobTitle);
        await expect(row).toBeVisible();
        await row.locator('button:has-text("Reject")').click();

        // Wait for rejection modal - filter by header text
        const modal = this.page.locator('div.fixed, div[role="dialog"]').filter({
            has: this.page.locator('h1, h2, h3, h4').filter({ hasText: /Reject job posting/i })
        }).last();

        await expect(modal).toBeVisible({ timeout: 5000 });

        if (reason) {
            const reasonInput = modal.locator('textarea, input[placeholder*="reason"]').first();
            await expect(reasonInput).toBeVisible({ timeout: 5000 });
            await reasonInput.fill(reason);
            // Click the confirmation button inside the modal
            await modal.locator('button:has-text("Submit"), button:has-text("Reject")').click();
        } else {
            const confirmButton = modal.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Reject")').first();
            await confirmButton.click();
        }

        await this.page.waitForLoadState('load');
    }

    /**
     * Get count of pending jobs
     */
    async getPendingJobCount(): Promise<number> {
        return await this.jobRows.count();
    }

    /**
     * Verify a job appears in the pending list
     */
    async expectJobInPendingList(jobTitle: string): Promise<void> {
        await expect(this.getRowByJobTitle(jobTitle)).toBeVisible();
    }
}
