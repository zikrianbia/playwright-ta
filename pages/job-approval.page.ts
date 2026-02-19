import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Job Approval page
 * Used by E2I admins to approve/reject partner jobs
 */
export class JobApprovalPage {
    readonly page: Page;
    readonly approvalList: Locator;
    readonly pendingJobs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.approvalList = page.locator('[data-testid="approval-list"], .approval-list');
        this.pendingJobs = page.locator('[data-testid="pending-job"], .pending-job-card');
    }

    /**
     * Navigate to the approval list page
     */
    async goto(): Promise<void> {
        await this.page.goto('/ta/approval');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Open a pending job by title
     */
    async openPendingJob(jobTitle: string): Promise<void> {
        await this.page.locator(`text=${jobTitle}`).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get count of pending jobs
     */
    async getPendingJobCount(): Promise<number> {
        return await this.pendingJobs.count();
    }

    /**
     * Verify a job appears in the pending list
     */
    async expectJobInPendingList(jobTitle: string): Promise<void> {
        await expect(this.page.locator(`text=${jobTitle}`)).toBeVisible();
    }
}
