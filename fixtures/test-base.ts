import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { JobCreationPage } from '../pages/job-creation.page';
import { JobDetailPage } from '../pages/job-detail.page';
import { JobApprovalPage } from '../pages/job-approval.page';
import { ApplicantsPage } from '../pages/applicants.page';
import { JobseekerMatchesPage } from '../pages/jobseeker-matches.page';
import { type TestAccount } from '../test-data/accounts';

/**
 * Custom fixtures that extend Playwright's base test
 */
type CustomFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    jobCreationPage: JobCreationPage;
    jobDetailPage: JobDetailPage;
    jobApprovalPage: JobApprovalPage;
    applicantsPage: ApplicantsPage;
    jobseekerMatchesPage: JobseekerMatchesPage;
    loginAs: (account: TestAccount) => Promise<Page>;
};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    jobCreationPage: async ({ page }, use) => {
        await use(new JobCreationPage(page));
    },

    jobDetailPage: async ({ page }, use) => {
        await use(new JobDetailPage(page));
    },

    jobApprovalPage: async ({ page }, use) => {
        await use(new JobApprovalPage(page));
    },

    applicantsPage: async ({ page }, use) => {
        await use(new ApplicantsPage(page));
    },

    jobseekerMatchesPage: async ({ page }, use) => {
        await use(new JobseekerMatchesPage(page));
    },

    /**
     * Helper fixture to login as any account.
     * Usage: const page = await loginAs(ACCOUNTS.e2i.superadmin);
     */
    loginAs: async ({ page }, use) => {
        const loginAs = async (account: TestAccount): Promise<Page> => {
            const loginPage = new LoginPage(page);
            await loginPage.loginAndWaitForDashboard(account.email, account.password);
            return page;
        };
        await use(loginAs);
    },
});

export { expect } from '@playwright/test';
