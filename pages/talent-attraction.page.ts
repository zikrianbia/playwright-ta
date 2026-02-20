import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Talent Attraction Dashboard
 */
export class TalentAttractionPage {
    readonly page: Page;
    readonly reviewApprovalRequestButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reviewApprovalRequestButton = page.locator('button:has-text("Review approval request")');
    }

    /**
     * Navigate to the Talent Attraction page
     */
    async goto(): Promise<void> {
        await this.page.goto('/talentattraction');
        await this.page.waitForLoadState('load');
    }

    /**
     * Click the "Review approval request" button in the top banner
     */
    async clickReviewApprovalRequest(): Promise<void> {
        await expect(this.reviewApprovalRequestButton).toBeVisible({ timeout: 10000 });
        await this.reviewApprovalRequestButton.click();
        await this.page.waitForLoadState('load');
        // Wait for the target page's table title to be visible
        await this.page.locator('h1, h2').filter({ hasText: 'Job posting approval requests' }).waitFor({ state: 'visible', timeout: 10000 });
    }
}
