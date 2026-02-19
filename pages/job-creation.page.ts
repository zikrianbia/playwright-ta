import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Job Creation form
 */
export class JobCreationPage {
    readonly page: Page;

    // Ownership fields
    readonly employerField: Locator;
    readonly hiringManagerField: Locator;
    readonly jobOwnerField: Locator;

    // Channel checkboxes/toggles
    readonly e2iChannel: Locator;
    readonly internalChannel: Locator;
    readonly externalChannel: Locator;

    // Job detail fields
    readonly jobTitleInput: Locator;
    readonly jobDescriptionInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Ownership fields — selectors will be refined once we explore the actual UI
        this.employerField = page.locator('[data-testid="employer-field"], #employer');
        this.hiringManagerField = page.locator('[data-testid="hiring-manager-field"], #hiring-manager');
        this.jobOwnerField = page.locator('[data-testid="job-owner-field"], #job-owner');

        // Channel selection
        this.e2iChannel = page.locator('[data-testid="channel-e2i"], label:has-text("E2I")');
        this.internalChannel = page.locator('[data-testid="channel-internal"], label:has-text("Internal")');
        this.externalChannel = page.locator('[data-testid="channel-external"], label:has-text("External")');

        // Job details
        this.jobTitleInput = page.locator('[data-testid="job-title"], input[name="title"]');
        this.jobDescriptionInput = page.locator('[data-testid="job-description"], textarea[name="description"]');
        this.submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Post")');
    }

    // ──────────────────────────────────────────────
    // Field State Assertions
    // ──────────────────────────────────────────────

    async expectEmployerEditable(): Promise<void> {
        await expect(this.employerField).toBeEnabled();
    }

    async expectEmployerDisabled(): Promise<void> {
        await expect(this.employerField).toBeDisabled();
    }

    async expectEmployerValue(value: string): Promise<void> {
        await expect(this.employerField).toContainText(value);
    }

    async expectHiringManagerDisabled(): Promise<void> {
        await expect(this.hiringManagerField).toBeDisabled();
    }

    async expectJobOwnerDisabled(): Promise<void> {
        await expect(this.jobOwnerField).toBeDisabled();
    }

    // ──────────────────────────────────────────────
    // Channel Assertions
    // ──────────────────────────────────────────────

    async expectE2IChannelEnabled(): Promise<void> {
        await expect(this.e2iChannel).toBeEnabled();
    }

    async expectE2IChannelDisabled(): Promise<void> {
        await expect(this.e2iChannel).toBeDisabled();
    }

    async expectInternalChannelEnabled(): Promise<void> {
        await expect(this.internalChannel).toBeEnabled();
    }

    async expectInternalChannelDisabled(): Promise<void> {
        await expect(this.internalChannel).toBeDisabled();
    }

    async expectExternalChannelEnabled(): Promise<void> {
        await expect(this.externalChannel).toBeEnabled();
    }

    async expectExternalChannelDisabled(): Promise<void> {
        await expect(this.externalChannel).toBeDisabled();
    }

    // ──────────────────────────────────────────────
    // Actions
    // ──────────────────────────────────────────────

    /**
     * Select an employer from the dropdown
     */
    async selectEmployer(employerName: string): Promise<void> {
        await this.employerField.click();
        await this.page.locator(`text=${employerName}`).click();
    }

    /**
     * Select hiring manager
     */
    async selectHiringManager(name: string): Promise<void> {
        await this.hiringManagerField.click();
        await this.page.locator(`text=${name}`).click();
    }

    /**
     * Select job owner
     */
    async selectJobOwner(name: string): Promise<void> {
        await this.jobOwnerField.click();
        await this.page.locator(`text=${name}`).click();
    }

    /**
     * Toggle channel selection
     */
    async selectChannels(channels: { e2i?: boolean; internal?: boolean; external?: boolean }): Promise<void> {
        if (channels.e2i) await this.e2iChannel.click();
        if (channels.internal) await this.internalChannel.click();
        if (channels.external) await this.externalChannel.click();
    }

    /**
     * Fill required job details
     */
    async fillJobDetails(title: string, description?: string): Promise<void> {
        await this.jobTitleInput.fill(title);
        if (description) {
            await this.jobDescriptionInput.fill(description);
        }
    }

    /**
     * Submit the job form
     */
    async submitJob(): Promise<void> {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
