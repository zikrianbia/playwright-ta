import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Applicants tab
 */
export class ApplicantsPage {
    readonly page: Page;
    readonly applicantList: Locator;
    readonly applicantCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applicantList = page.locator('[data-testid="applicant-list"], .applicant-list');
        this.applicantCards = page.locator('[data-testid="applicant-card"], .applicant-card');
    }

    /**
     * Get number of applicants
     */
    async getApplicantCount(): Promise<number> {
        return await this.applicantCards.count();
    }

    /**
     * Verify the applicant list is empty
     */
    async expectNoApplicants(): Promise<void> {
        await expect(this.applicantCards).toHaveCount(0);
    }

    /**
     * Find an applicant by name
     */
    getApplicantByName(name: string): Locator {
        return this.page.locator(`.applicant-card:has-text("${name}"), [data-testid="applicant-card"]:has-text("${name}")`);
    }

    /**
     * Verify an applicant has a specific status
     */
    async expectApplicantStatus(name: string, status: string): Promise<void> {
        const applicant = this.getApplicantByName(name);
        await expect(applicant).toContainText(status);
    }

    /**
     * Update an applicant's status
     */
    async updateApplicantStatus(name: string, newStatus: string): Promise<void> {
        const applicant = this.getApplicantByName(name);
        // Click the status dropdown/button on the applicant card
        const statusButton = applicant.locator('select, [data-testid="status-dropdown"], button:has-text("Status")');
        await statusButton.click();
        await this.page.locator(`text=${newStatus}`).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify applicant source label (E2I Jobseeker, Internal Employee, External Talent)
     */
    async expectApplicantSourceLabel(name: string, sourceLabel: string): Promise<void> {
        const applicant = this.getApplicantByName(name);
        await expect(applicant).toContainText(sourceLabel);
    }

    /**
     * Open an applicant's profile
     */
    async openApplicantProfile(name: string): Promise<void> {
        const applicant = this.getApplicantByName(name);
        await applicant.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify status is read-only for the current user
     */
    async expectStatusReadOnly(name: string): Promise<void> {
        const applicant = this.getApplicantByName(name);
        const statusButton = applicant.locator('select, [data-testid="status-dropdown"]');
        await expect(statusButton).toBeDisabled();
    }
}
