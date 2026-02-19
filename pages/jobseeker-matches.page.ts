import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Jobseeker Matches tab
 */
export class JobseekerMatchesPage {
    readonly page: Page;
    readonly matchList: Locator;
    readonly matchCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.matchList = page.locator('[data-testid="match-list"], .match-list');
        this.matchCards = page.locator('[data-testid="match-card"], .match-card');
    }

    /**
     * Get count of matched jobseekers
     */
    async getMatchCount(): Promise<number> {
        return await this.matchCards.count();
    }

    /**
     * Verify matches are displayed
     */
    async expectMatchesDisplayed(): Promise<void> {
        await expect(this.matchCards.first()).toBeVisible();
    }

    /**
     * Find a jobseeker match by name
     */
    getMatchByName(name: string): Locator {
        return this.page.locator(`.match-card:has-text("${name}"), [data-testid="match-card"]:has-text("${name}")`);
    }

    /**
     * Verify a jobseeker match displays expected info
     */
    async expectMatchInfo(name: string, fields: { email?: string; matchScore?: boolean; badges?: boolean }): Promise<void> {
        const match = this.getMatchByName(name);
        await expect(match).toBeVisible();
        if (fields.email) {
            await expect(match).toContainText(fields.email);
        }
    }

    /**
     * Send an invitation to a jobseeker
     */
    async sendInvitation(name: string): Promise<void> {
        const match = this.getMatchByName(name);
        const inviteButton = match.locator('button:has-text("Invite"), button:has-text("Send")');
        await inviteButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Open a jobseeker's profile
     */
    async openProfile(name: string): Promise<void> {
        const match = this.getMatchByName(name);
        await match.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify profile details are shown (CV, skills, etc.)
     */
    async expectProfileDetails(): Promise<void> {
        // Verify key profile sections are visible
        const cvSection = this.page.locator('text=CV, text=Resume, [data-testid="cv-section"]');
        await expect(cvSection.first()).toBeVisible();
    }

    /**
     * Verify unlock button for external talents
     */
    async expectUnlockTalentsButton(): Promise<void> {
        const unlockButton = this.page.locator('button:has-text("Unlock")');
        await expect(unlockButton).toBeVisible();
    }
}
