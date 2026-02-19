import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the TA Dashboard
 */
export class DashboardPage {
    readonly page: Page;
    readonly createJobButton: Locator;
    readonly jobList: Locator;
    readonly jobCards: Locator;
    readonly taModuleLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // FAB (Floating Action Button) or Create Job button
        this.createJobButton = page.locator(
            'button:has-text("Create"), [data-testid="create-job"], .fab-button'
        );
        this.jobList = page.locator('.job-list, [data-testid="job-list"]');
        this.jobCards = page.locator('.job-card, [data-testid="job-card"]');
        this.taModuleLink = page.locator('a:has-text("Talent Attraction"), [data-testid="ta-module"]');
    }

    /**
     * Navigate to TA module
     */
    async navigateToTA(): Promise<void> {
        await this.taModuleLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click the Create Job button (FAB)
     */
    async clickCreateJob(): Promise<void> {
        await this.createJobButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get count of visible job cards
     */
    async getJobCardCount(): Promise<number> {
        return await this.jobCards.count();
    }

    /**
     * Open a job by its title text
     */
    async openJobByTitle(title: string): Promise<void> {
        await this.page.locator(`.job-card:has-text("${title}")`).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify job is visible in the list
     */
    async expectJobVisible(title: string): Promise<void> {
        await expect(this.page.locator(`text=${title}`)).toBeVisible();
    }

    /**
     * Verify job is NOT visible in the list
     */
    async expectJobNotVisible(title: string): Promise<void> {
        await expect(this.page.locator(`text=${title}`)).not.toBeVisible();
    }
}
