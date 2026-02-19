import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Job Detail page
 * Handles tab navigation and tab state assertions
 */
export class JobDetailPage {
    readonly page: Page;

    // Tabs
    readonly aboutJobTab: Locator;
    readonly jobseekerMatchesTab: Locator;
    readonly internalMatchesTab: Locator;
    readonly externalMatchesTab: Locator;
    readonly applicantsTab: Locator;

    // Banners
    readonly pendingApprovalBanner: Locator;
    readonly rejectionBanner: Locator;

    // Approval actions
    readonly approveButton: Locator;
    readonly rejectButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Tab selectors — will be refined when we explore the actual UI
        this.aboutJobTab = page.locator('[data-testid="tab-about-job"], [role="tab"]:has-text("About")');
        this.jobseekerMatchesTab = page.locator('[data-testid="tab-jobseeker-matches"], [role="tab"]:has-text("Jobseeker Match")');
        this.internalMatchesTab = page.locator('[data-testid="tab-internal-matches"], [role="tab"]:has-text("Internal Match")');
        this.externalMatchesTab = page.locator('[data-testid="tab-external-matches"], [role="tab"]:has-text("External Match")');
        this.applicantsTab = page.locator('[data-testid="tab-applicants"], [role="tab"]:has-text("Applicant")');

        // Banners
        this.pendingApprovalBanner = page.locator('[data-testid="pending-approval-banner"], .banner:has-text("Pending"), .alert:has-text("approval")');
        this.rejectionBanner = page.locator('[data-testid="rejection-banner"], .banner:has-text("Reject"), .alert:has-text("reject")');

        // Approval buttons
        this.approveButton = page.locator('button:has-text("Approve")');
        this.rejectButton = page.locator('button:has-text("Reject")');
    }

    // ──────────────────────────────────────────────
    // Tab Navigation
    // ──────────────────────────────────────────────

    async clickAboutJobTab(): Promise<void> {
        await this.aboutJobTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickJobseekerMatchesTab(): Promise<void> {
        await this.jobseekerMatchesTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickInternalMatchesTab(): Promise<void> {
        await this.internalMatchesTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickExternalMatchesTab(): Promise<void> {
        await this.externalMatchesTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickApplicantsTab(): Promise<void> {
        await this.applicantsTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    // ──────────────────────────────────────────────
    // Tab Visibility & State Assertions
    // ──────────────────────────────────────────────

    async expectAboutJobTabVisible(): Promise<void> {
        await expect(this.aboutJobTab).toBeVisible();
    }

    async expectJobseekerMatchesTabVisible(): Promise<void> {
        await expect(this.jobseekerMatchesTab).toBeVisible();
    }

    async expectJobseekerMatchesTabDisabled(): Promise<void> {
        await expect(this.jobseekerMatchesTab).toBeVisible();
        // Check for disabled class or aria-disabled
        await expect(this.jobseekerMatchesTab).toHaveAttribute('aria-disabled', 'true');
    }

    async expectInternalMatchesTabVisible(): Promise<void> {
        await expect(this.internalMatchesTab).toBeVisible();
    }

    async expectExternalMatchesTabVisible(): Promise<void> {
        await expect(this.externalMatchesTab).toBeVisible();
    }

    async expectApplicantsTabVisible(): Promise<void> {
        await expect(this.applicantsTab).toBeVisible();
    }

    // ──────────────────────────────────────────────
    // Banner Assertions
    // ──────────────────────────────────────────────

    async expectPendingApprovalBanner(): Promise<void> {
        await expect(this.pendingApprovalBanner).toBeVisible();
    }

    async expectRejectionBanner(): Promise<void> {
        await expect(this.rejectionBanner).toBeVisible();
    }

    // ──────────────────────────────────────────────
    // Approval Actions
    // ──────────────────────────────────────────────

    async approveJob(): Promise<void> {
        await this.approveButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async rejectJob(reason?: string): Promise<void> {
        await this.rejectButton.click();
        if (reason) {
            const reasonInput = this.page.locator('textarea, input[name="reason"]');
            await reasonInput.fill(reason);
        }
        // Confirm rejection
        const confirmButton = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")');
        await confirmButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
