import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';

/**
 * 2A-D. Job Posting Flow tests per workspace
 */

// --- 2A. E2I Job Posting ---
test.describe('2A. E2I Job Posting (No Approval)', () => {
    test('E2I job is published immediately', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('E2I selects employer and ownership fields', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('E2I job channel is restricted to E2I only', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});

// --- 2B. Partner Only Job Posting ---
test.describe('2B. Partner Employer Job Posting', () => {
    test('Ownership fields are disabled', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Channel selection restricted to E2I', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Partner job requires approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Pending approval job is read-only', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Approved job visible to E2I and Partner', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Rejected job shows reason', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});

// --- 2C. TM Only Job Posting ---
test.describe('2C. Google TM Only Job Posting', () => {
    test('TM-only job published immediately', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('E2I channel is unavailable', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Job detail shows correct tabs', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});

// --- 2D. TM + E2I Job Posting ---
test.describe('2D. JobTech TM + E2I Job Posting', () => {
    test('E2I-only job requires approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Rejected E2I-only job not visible', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Internal-only job skips approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('E2I rejection with other channels: job remains visible', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('All channels: job enters approval', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
    test('Rejected all-channel job remains visible for TM channels', async ({ page }) => {
        test.skip(true, 'To be implemented');
    });
});
