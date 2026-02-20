import { test, expect } from '../../fixtures/test-base';
import { ACCOUNTS } from '../../test-data/accounts';
import { getBearerToken, createAuthenticatedApiContext } from '../../utils/api-auth';

/**
 * E2I Superadmin (Grace e2i) — Job Creation + Send Invitations
 *
 * Account: demo+uat-grace+e2i@jobtech.sg
 * Channel: E2I only
 * Employer: Test Hiring Enterprise 2 (hiringEnterpriseId: 44)
 * Hiring Manager: zikri@jobtech.sg
 * Job Owner: demo+uat-e2i-user-3@jobtech.sg
 *
 * Based on the captured curl from reference/postjob2.sh
 */
test.describe('E2I Superadmin - Job Creation (on behalf of Test Hiring Enterprise 2)', () => {

    test('can create a job and send invitations to top 3 jobseeker matches', async ({ page, jobDetailPage, jobseekerMatchesPage }) => {
        test.setTimeout(180000); // 3 minutes for the full flow

        const account = ACCOUNTS.e2i.superadmin;
        const baseURL = process.env.BASE_URL || 'https://uat.betalented.ai';

        // ════════════════════════════════════════════════
        // PHASE 1: Create job via API
        // ════════════════════════════════════════════════

        // 1. Login via browser and capture bearer token
        console.log('🔄 Step 1: Logging in to capture bearer token...');
        const bearerToken = await getBearerToken(page, account.email, account.password);
        expect(bearerToken).toBeTruthy();
        console.log(`✅ Bearer token captured (length: ${bearerToken.length})`);

        // 2. Create authenticated API context
        console.log('🔄 Step 2: Creating API context...');
        const apiContext = await createAuthenticatedApiContext(baseURL, bearerToken);

        // 3. Build the job payload
        console.log('🔄 Step 3: Building job payload...');
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(-2);
        const time = now.toTimeString().slice(0, 5); // HH:mm
        const formattedDate = `${dd}/${mm}/${yy}/${time}`;

        const hiringFrom = now.toISOString().slice(0, 10);
        const hiringTo = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
            .toISOString().slice(0, 10);

        const jobPayload = {
            workspaceId: 1,
            hiringEnterpriseName: 'Test Hiring Enterprise 2',
            hiringEnterpriseId: 44,
            hiringManagerEmail: 'zikri@jobtech.sg',
            jobOwnerEmail: 'demo+uat-e2i-user-3@jobtech.sg',
            jobTitle: `QA Engineer (Automated ${formattedDate})`,
            territoryId: 203,
            salaryFrom: 3000,
            salaryTo: 8000,
            displaySalary: true,
            hiringFrom,
            hiringTo,
            employmentTypes: ['FULL_TIME'],
            jobTypes: ['PERMANENT'],
            workplaceType: 'ON_SITE',
            visibility: 'REACH_OUT',
            internalChannel: false,
            externalChannel: false,
            e2iChannel: true,
            flexibleWorkArrangement: false,
            jobDescription: 'Quality Assurance (QA) Engineer ensures software products meet quality standards by developing test plans, executing manual/automated tests, and identifying bugs before release. They collaborate with developers to analyze requirements, perform regression testing, and document issues. Key skills include automation tools (Selenium, Appium), scripting (Python, Java), and bug-tracking systems (Jira).\nKey Responsibilities\nTesting Strategy: Designing, implementing, and executing test cases (functional, regression, performance, API).\nAutomation: Developing automated scripts to improve testing efficiency.\nDefect Management: Identifying, logging, and tracking bugs using tools like Jira.\nCollaboration: Working with developers and product managers to ensure requirements are met.\nDocumentation: Creating detailed, comprehensive, and well-structured test plans.\nMonitoring: Analyzing test results and providing feedback to improve software quality.',
            jobDescriptionHtml: '<div className="react-draft-editor-content"><p>Quality Assurance (QA) Engineer ensures software products meet quality standards by developing test plans, executing manual/automated tests, and identifying bugs before release. They collaborate with developers to analyze requirements, perform regression testing, and document issues. Key skills include automation tools (Selenium, Appium), scripting (Python, Java), and bug-tracking systems (Jira). <br>Key Responsibilities<br>Testing Strategy: Designing, implementing, and executing test cases (functional, regression, performance, API).<br>Automation: Developing automated scripts to improve testing efficiency.<br>Defect Management: Identifying, logging, and tracking bugs using tools like Jira.<br>Collaboration: Working with developers and product managers to ensure requirements are met.<br>Documentation: Creating detailed, comprehensive, and well-structured test plans.<br>Monitoring: Analyzing test results and providing feedback to improve software quality.</p>\n</div>',
            jobRequirement: 'Required Skills and Qualifications\nAttention to Detail: Meticulous checking to identify small defects that could have a large impact.\nAnalytical Skills: Ability to analyze data to detect trends and implement corrective actions.\nTechnical Knowledge: Familiarity with QA tools, methodologies, and software development lifecycles.\nCommunication: Strong verbal and written skills to clearly communicate issues and recommendations.\nEducation: A Bachelor\'s degree in a relevant field (e.g., Engineering, Computer Science, Business) is often required. ',
            jobRequirementHtml: '<div className="react-draft-editor-content"><p>Required Skills and Qualifications<br>Attention to Detail: Meticulous checking to identify small defects that could have a large impact.<br>Analytical Skills: Ability to analyze data to detect trends and implement corrective actions.<br>Technical Knowledge: Familiarity with QA tools, methodologies, and software development lifecycles.<br>Communication: Strong verbal and written skills to clearly communicate issues and recommendations.<br>Education: A Bachelor\'s degree in a relevant field (e.g., Engineering, Computer Science, Business) is often required.&nbsp;</p>\n</div>',
            skills: [
                { skillId: 2477, skillTypeId: 1, f1: true },
                { skillId: 2489, skillTypeId: 1, f1: true },
                { skillId: 399, skillTypeId: 1, f1: true },
                { skillId: 1108, skillTypeId: 2, f1: false },
                { skillId: 1294, skillTypeId: 2, f1: true },
                { skillId: 2214, skillTypeId: 2, f1: false },
                { skillId: 1035, skillTypeId: 2, f1: false },
                { skillId: 829, skillTypeId: 2, f1: false },
                { skillId: 1287, skillTypeId: 2, f1: false },
                { skillId: 6822, skillTypeId: 2, f1: false },
                { skillId: 839, skillTypeId: 2, f1: true },
                { skillId: 467, skillTypeId: 2, f1: false },
                { skillId: 679, skillTypeId: 2, f1: false },
                { skillId: 2213, skillTypeId: 2, f1: false },
                { skillId: 988, skillTypeId: 4, f1: false },
                { skillId: 70, skillTypeId: 4, f1: false },
                { skillId: 1570, skillTypeId: 4, f1: false },
            ],
            yoxMin: 2,
            yoxMax: 5,
            vacancy: 8,
            salaryRateId: 3,
            commitment: 40,
            commitmentUnitId: 1,
            commitmentFrequencyId: 1,
            workingHours: '8',
            pmet: false,
            openToLtvp: false,
            openToExOffenders: false,
            openToPwd: false,
            openToFreshGraduates: false,
            jobFunctionId: 0,
            qualificationId: 0,
            specialisationId: 0,
            jobLocations: [
                { jobLocationId: null, territoryId: 203, regionId: null, zipcode: '', address: '' },
            ],
        };

        // 4. POST the job
        console.log('🔄 Step 4: Posting job via API...');
        const response = await apiContext.post('/ws-ta/jobs', { data: jobPayload });

        // 5. Parse response and extract jobId
        const statusCode = response.status();
        const responseText = await response.text();
        console.log(`📡 Response: ${statusCode} ${response.statusText()}`);
        console.log(`📡 Response body: ${responseText.substring(0, 1000)}`);

        expect(statusCode, `Expected 2xx but got ${statusCode}. Body: ${responseText.substring(0, 500)}`).toBeGreaterThanOrEqual(200);
        expect(statusCode, `Expected 2xx but got ${statusCode}`).toBeLessThan(300);

        const responseBody = JSON.parse(responseText);
        const jobId = responseBody.id || responseBody.jobId;
        expect(jobId, 'Job ID should be returned in the response').toBeTruthy();
        console.log(`✅ Job created! ID: ${jobId}, Title: ${responseBody.jobTitle}`);

        await apiContext.dispose();

        // ════════════════════════════════════════════════
        // PHASE 2: Navigate to job detail & send invitations
        // ════════════════════════════════════════════════

        // 6. Navigate to the job detail page
        const jobDetailUrl = `/talentattraction/${jobId}`;
        console.log(`🔄 Step 6: Navigating to ${jobDetailUrl}...`);
        await page.goto(jobDetailUrl);
        await page.waitForLoadState('domcontentloaded');

        // Verify we landed on the job detail page by waiting for job title text
        console.log(`⏳ Waiting for job title: "${responseBody.jobTitle}"...`);
        const titleLocator = page.getByText(responseBody.jobTitle).first();
        try {
            await titleLocator.waitFor({ state: 'visible', timeout: 30000 });
            console.log('✅ Job detail page loaded with correct title');
        } catch (e) {
            console.log('⚠️ Could not find exact job title, dumping page text...');
            const bodyText = await page.textContent('body');
            console.log(bodyText?.substring(0, 500));
            throw e;
        }

        // 7. Click the "Jobseeker Matches" tab
        console.log('🔄 Step 7: Clicking "Jobseeker Matches" tab...');

        const tab = jobDetailPage.jobseekerMatchesTab.first();
        try {
            await tab.waitFor({ state: 'visible', timeout: 15000 });
            await tab.click({ force: true });
        } catch (e) {
            console.log('⚠️ Standard tab click failed, trying fallback selector...');
            await page.locator('button').filter({ hasText: 'Jobseeker matches' }).first().click({ force: true });
        }
        console.log('✅ Jobseeker Matches tab clicked');

        // 8. Wait for the candidate list to load (with generous timeout)
        console.log('⏳ Step 8: Waiting for candidate list to populate...');
        await jobseekerMatchesPage.expectMatchesDisplayed(60000);
        console.log('✅ Candidate list is loaded');

        // 9. Send invitations to top 3 jobseekers
        console.log('🔄 Step 9: Sending invitations to top 3 jobseeker matches...');
        const sentCount = await jobseekerMatchesPage.inviteTopCandidates(3);

        // ASSERT: at least 1 invitation must have been sent
        expect(sentCount, `Expected at least 1 invitation to be sent, but got ${sentCount}`).toBeGreaterThanOrEqual(1);

        console.log(`✅ Successfully sent ${sentCount} invitation(s)!`);
        console.log('✅ Full test flow completed: Job created → Jobseeker matches → Invitations sent');
    });
});
