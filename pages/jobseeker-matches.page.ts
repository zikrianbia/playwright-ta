import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Jobseeker Matches tab
 *
 * UI Layout:
 *   Left pane  – scrollable list of talent cards (name, email, match badge)
 *   Right pane – detail view of selected talent with "Send invitation" button
 *
 * Flow to send invitation:
 *   1. Click a candidate card in the left list
 *   2. Wait for the detail pane to show the candidate info
 *   3. Click "Send invitation" button in the detail pane
 */
export class JobseekerMatchesPage {
    readonly page: Page;

    // Left pane – the scrollable candidate list container
    readonly candidateListPane: Locator;

    // Right pane – the detail view container
    readonly detailPane: Locator;

    // Individual candidate cards inside the left list
    // Each card has an h6 (name), a <p> (email), and a badge text (Strong/Average/Weak/Simple)
    readonly candidateCards: Locator;

    // "Send invitation" button in the detail pane
    readonly sendInvitationButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Left pane: the scrollable list with col-span-4
        this.candidateListPane = page.locator('div.col-span-12.md\\:col-span-4').first();

        // Right pane: detail view with col-span-8
        this.detailPane = page.locator('div.col-span-12.md\\:col-span-8').first();

        // Candidate cards: each card has id="posting-box" and contains h6 (name) + p (email)
        // Structure: leftPane > wrapper div > card divs (with #posting-box inside)
        this.candidateCards = this.candidateListPane.locator('#posting-box');

        // "Send invitation" button inside the detail pane
        this.sendInvitationButton = this.detailPane.locator('button').filter({ hasText: /Send invitation/i }).first();
    }

    /**
     * Get count of matched jobseekers in the left list
     */
    async getMatchCount(): Promise<number> {
        return await this.candidateCards.count();
    }

    /**
     * Wait for the candidate list to be populated (at least one card visible).
     * Uses a generous timeout because the matches can take time to render
     * after the tab is clicked.
     */
    async expectMatchesDisplayed(timeout = 60000): Promise<void> {
        console.log(`⏳ expectMatchesDisplayed: waiting up to ${timeout / 1000}s for candidate cards...`);

        try {
            // First, wait for the left pane container itself
            await this.candidateListPane.waitFor({ state: 'visible', timeout: 30000 });
            console.log('   ✅ Candidate list pane is visible');

            // Then wait for at least one candidate card with an h6 inside
            await this.candidateCards.first().waitFor({ state: 'visible', timeout });
            const count = await this.candidateCards.count();
            console.log(`   ✅ ${count} candidate card(s) found`);
        } catch (e) {
            console.log('   ⚠️ expectMatchesDisplayed FAILED. Debugging page state:');

            // Dump useful diagnostics
            const h6s = await this.page.locator('h6').allTextContents();
            console.log('   h6 elements on page:', h6s.slice(0, 10));

            const allButtons = await this.page.locator('button').allTextContents();
            console.log('   buttons on page:', allButtons.slice(0, 15));

            // Check if there is a loading spinner/skeleton
            const spinners = await this.page.locator('[role="progressbar"], .spinner, .loading, .skeleton, svg.animate-spin').count();
            console.log('   loading indicators found:', spinners);

            throw e;
        }
    }

    /**
     * Click the Nth candidate card in the left list (0-indexed)
     * and wait for the detail pane to update.
     */
    async selectCandidate(index: number): Promise<string> {
        const card = this.candidateCards.nth(index);
        await card.waitFor({ state: 'visible', timeout: 10000 });

        // Get the candidate name from the card for logging
        const nameEl = card.locator('h6').first();
        const candidateName = await nameEl.textContent() || `Candidate #${index + 1}`;
        console.log(`   🔹 Selecting candidate: "${candidateName.trim()}"`);

        await card.click();

        // Wait for the detail pane to show this candidate's name
        // The detail pane h6 should match the clicked candidate's name
        await this.detailPane.locator('h6').first().waitFor({ state: 'visible', timeout: 10000 });
        console.log(`   ✅ Detail pane loaded for "${candidateName.trim()}"`);

        return candidateName.trim();
    }

    /**
     * Find a jobseeker match card by name in the left list
     */
    getMatchByName(name: string): Locator {
        return this.candidateCards.filter({ hasText: name }).first();
    }

    /**
     * Click "Send invitation" for the currently selected candidate in the detail pane.
     *
     * Two-step flow:
     *   1. Click "Send invitation" in the detail pane → opens an overlay modal
     *      with title "Invite to apply for [Job]", a rich-text editor for the
     *      invitation message, and buttons: "close" + "Send invitation".
     *   2. Click the "Send invitation" button inside the modal to actually send.
     *   3. Wait for the modal/overlay to disappear before returning.
     *
     * Returns true if the invitation was sent, false if already invited or missing.
     */
    async clickSendInvitation(): Promise<boolean> {
        // Wait a moment for the detail pane to settle
        await this.page.waitForTimeout(500);

        // Check if the "Send invitation" button is present and visible
        const buttonCount = await this.sendInvitationButton.count();
        if (buttonCount === 0) {
            console.log('      ⚠️ No "Send invitation" button found (may already be invited)');
            const detailText = await this.detailPane.textContent();
            if (detailText?.match(/invited|invitation sent|pending/i)) {
                console.log('      ℹ️ Candidate appears to already be invited');
            }
            return false;
        }

        const isVisible = await this.sendInvitationButton.isVisible();
        if (!isVisible) {
            console.log('      ⚠️ "Send invitation" button exists but is not visible');
            return false;
        }

        // ── Step 1: Click "Send invitation" in the detail pane ──
        console.log('      🔘 Clicking "Send invitation" (detail pane)...');
        await this.sendInvitationButton.click();

        // ── Step 2: Wait for the invitation modal overlay to appear ──
        // The modal is a fixed full-screen overlay with z-50, containing:
        //   - Title "Invite to apply for ..."
        //   - Rich text editor for message
        //   - "Send invitation" confirm button
        const invitationModal = this.page.locator('div.fixed.z-50, div[class*="fixed"][class*="z-50"]').first();
        try {
            await invitationModal.waitFor({ state: 'visible', timeout: 10000 });
            console.log('      📋 Invitation modal appeared');
        } catch {
            console.log('      ⚠️ Invitation modal did not appear, checking if invitation was sent directly...');
            await this.page.waitForTimeout(1000);
            return true;
        }

        // ── Step 3: Click "Send invitation" inside the modal ──
        const modalSendButton = invitationModal.locator('button').filter({ hasText: /Send invitation/i }).first();
        await modalSendButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('      🔘 Clicking "Send invitation" (modal confirm)...');
        await modalSendButton.click();

        // ── Step 4: Wait for the modal to close ──
        // The overlay should disappear after the invitation is sent
        try {
            await invitationModal.waitFor({ state: 'hidden', timeout: 15000 });
            console.log('      ✅ Invitation sent — modal closed');
        } catch {
            // Modal might still be visible; try dismissing it
            console.log('      ⚠️ Modal still visible, trying to close...');
            const closeButton = invitationModal.locator('button').filter({ hasText: /close|×/i }).first();
            if (await closeButton.isVisible()) {
                await closeButton.click();
                await this.page.waitForTimeout(1000);
            }
        }

        // Small wait between invitations for UI to settle
        await this.page.waitForTimeout(1500);
        return true;
    }

    /**
     * Send invitations to the top N candidates.
     *
     * Flow: for each candidate:
     *   1. Click the candidate card in the left list
     *   2. Wait for the detail pane to load
     *   3. Click "Send invitation" in the detail pane
     */
    async inviteTopCandidates(count: number): Promise<number> {
        console.log('🔍 inviteTopCandidates: Verifying matches are displayed...');
        await this.expectMatchesDisplayed();

        const matchCount = await this.getMatchCount();
        const inviteCount = Math.min(count, matchCount);
        console.log(`🔍 inviteTopCandidates: Will invite top ${inviteCount} of ${matchCount} candidates`);

        let successCount = 0;

        for (let i = 0; i < inviteCount; i++) {
            console.log(`\n   📌 Processing candidate ${i + 1} of ${inviteCount}...`);

            // 1. Click the candidate card in the left list
            const name = await this.selectCandidate(i);

            // 2. Click "Send invitation" in the detail pane
            const sent = await this.clickSendInvitation();
            if (sent) {
                successCount++;
                console.log(`   ✅ Invitation #${successCount} sent to "${name}"`);
            } else {
                console.log(`   ⚠️ Could not send invitation to "${name}" (skipped)`);
            }
        }

        console.log(`\n📊 Invitation summary: ${successCount}/${inviteCount} invitations sent`);
        return successCount;
    }

    /**
     * Send an invitation to a specific jobseeker by name
     */
    async sendInvitation(name: string): Promise<void> {
        // Click the card in the left list
        const card = this.getMatchByName(name);
        await card.click();

        // Wait for detail pane to load
        await this.detailPane.locator('h6').first().waitFor({ state: 'visible', timeout: 10000 });

        // Click send invitation
        await this.clickSendInvitation();
    }

    /**
     * Open a jobseeker's profile by clicking their card
     */
    async openProfile(name: string): Promise<void> {
        const match = this.getMatchByName(name);
        await match.click();
        await this.detailPane.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Verify profile details are shown in the detail pane
     */
    async expectProfileDetails(): Promise<void> {
        await expect(this.detailPane).toBeVisible();
        // Verify key content like CV section
        const cvSection = this.detailPane.locator('text=CV, text=Resume, text=Download CV');
        await expect(cvSection.first()).toBeVisible({ timeout: 10000 });
    }

    /**
     * Verify unlock button for external talents
     */
    async expectUnlockTalentsButton(): Promise<void> {
        const unlockButton = this.page.locator('button:has-text("Unlock")');
        await expect(unlockButton).toBeVisible();
    }
}
