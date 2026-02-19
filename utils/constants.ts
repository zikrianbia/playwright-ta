/**
 * URL path constants for the application
 */
export const URLS = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    TA_MODULE: '/ta',
    JOB_CREATION: '/ta/job/create',
    JOB_APPROVAL: '/ta/approval',
} as const;

/**
 * Timeout values in milliseconds
 */
export const TIMEOUTS = {
    SHORT: 5000,
    MEDIUM: 15000,
    LONG: 30000,
    EXTRA_LONG: 60000,
} as const;

/**
 * Application status values
 */
export const APPLICATION_STATUS = {
    APPLIED: 'Applied',
    REVIEWED: 'Reviewed',
    SHORTLISTED: 'Shortlisted',
    KEEP_IN_VIEW: 'Keep In View',
    SUCCESSFUL: 'Successful',
    UNSUCCESSFUL: 'Unsuccessful',
} as const;

/**
 * Job status values
 */
export const JOB_STATUS = {
    PENDING_APPROVAL: 'Pending Approval',
    ACTIVE: 'Active',
    REJECTED: 'Rejected',
} as const;

/**
 * Channel types
 */
export const CHANNELS = {
    E2I: 'E2I',
    INTERNAL_EMPLOYEES: 'Internal Employees',
    EXTERNAL_TALENTS: 'External Talents',
} as const;

/**
 * Talent source labels
 */
export const TALENT_SOURCE = {
    E2I_JOBSEEKER: 'E2I Jobseeker',
    INTERNAL_EMPLOYEE: 'Internal Employee',
    EXTERNAL_TALENT: 'External Talent',
} as const;
