/**
 * Account definitions for all workspace types and roles.
 * Credentials are loaded from environment variables.
 */

export interface TestAccount {
    email: string;
    password: string;
    name: string;
    workspace: string;
    role: string;
}

function getEnvOrThrow(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}. Check your .env file.`);
    }
    return value;
}

function getPassword(): string {
    return getEnvOrThrow('DEFAULT_PASSWORD');
}

// ──────────────────────────────────────────────
// E2I Main Workspace
// ──────────────────────────────────────────────
export const E2I_SUPERADMIN: TestAccount = {
    get email() { return getEnvOrThrow('E2I_SUPERADMIN_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('E2I_SUPERADMIN_NAME'); },
    workspace: 'E2I Main',
    role: 'Superadmin',
};

export const E2I_JOB_OWNER: TestAccount = {
    get email() { return getEnvOrThrow('E2I_JOBOWNER_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('E2I_JOBOWNER_NAME'); },
    workspace: 'E2I Main',
    role: 'Job Owner',
};

// ──────────────────────────────────────────────
// Test Hiring Enterprise 2 (Partner only)
// ──────────────────────────────────────────────
export const PARTNER_ADMIN: TestAccount = {
    get email() { return getEnvOrThrow('PARTNER_ADMIN_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('PARTNER_ADMIN_NAME'); },
    workspace: 'Test Hiring Enterprise 2',
    role: 'Partner Admin',
};

// ──────────────────────────────────────────────
// Google (TM only)
// ──────────────────────────────────────────────
export const GOOGLE_SUPERADMIN: TestAccount = {
    get email() { return getEnvOrThrow('GOOGLE_SUPERADMIN_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('GOOGLE_SUPERADMIN_NAME'); },
    workspace: 'Google',
    role: 'Superadmin',
};

export const GOOGLE_JOBOWNER: TestAccount = {
    get email() { return getEnvOrThrow('GOOGLE_JOBOWNER_PARTNER_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('GOOGLE_JOBOWNER_PARTNER_NAME'); },
    workspace: 'Google',
    role: 'Job Owner + Partner Admin',
};

// ──────────────────────────────────────────────
// JobTech (TM & E2I Partner)
// ──────────────────────────────────────────────
export const JOBTECH_SUPERADMIN: TestAccount = {
    get email() { return getEnvOrThrow('JOBTECH_SUPERADMIN_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('JOBTECH_SUPERADMIN_NAME'); },
    workspace: 'JobTech',
    role: 'Superadmin + Partner Admin',
};

export const JOBTECH_JOB_OWNER: TestAccount = {
    get email() { return getEnvOrThrow('JOBTECH_JOBOWNER_EMAIL'); },
    get password() { return getPassword(); },
    get name() { return getEnvOrThrow('JOBTECH_JOBOWNER_NAME'); },
    workspace: 'JobTech',
    role: 'Job Owner + Partner Admin',
};

// ──────────────────────────────────────────────
// Grouped by workspace for convenience
// ──────────────────────────────────────────────
export const ACCOUNTS = {
    e2i: {
        superadmin: E2I_SUPERADMIN,
        jobOwner: E2I_JOB_OWNER,
    },
    partner: {
        admin: PARTNER_ADMIN,
    },
    google: {
        superadmin: GOOGLE_SUPERADMIN,
        jobOwner: GOOGLE_JOBOWNER,
    },
    jobtech: {
        superadmin: JOBTECH_SUPERADMIN,
        jobOwner: JOBTECH_JOB_OWNER,
    },
} as const;
