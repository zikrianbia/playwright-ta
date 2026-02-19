import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: false, // Sequential for E2E flows that depend on state
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
    ],
    use: {
        baseURL: process.env.BASE_URL || 'https://uat.betalented.ai',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },
    projects: [
        // Auth setup projects — run first to create storage states
        {
            name: 'e2i-superadmin-setup',
            testMatch: /.*\.setup\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },
        // Main test project
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            // dependencies: ['e2i-superadmin-setup'], // Enable when auth setup is ready
        },
    ],
});
