import { type Page, type APIRequestContext, request as playwrightRequest } from '@playwright/test';

/**
 * Helper to obtain a fresh bearer token by logging in via the browser
 * and intercepting the auth token from network requests.
 *
 * Strategy: Login via the UI, then capture the bearer token from
 * API calls made by the app, OR extract from localStorage/cookies.
 */
export async function getBearerToken(page: Page, email: string, password: string): Promise<string> {
    let bearerToken = '';

    // Intercept ALL requests to capture the Authorization header
    page.on('request', (req) => {
        const authHeader = req.headers()['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ') && !bearerToken) {
            bearerToken = authHeader.replace('Bearer ', '');
            console.log('🔑 Bearer token captured from request to:', req.url());
        }
    });

    // Also intercept responses to catch token in response bodies
    page.on('response', async (res) => {
        if (bearerToken) return;
        const url = res.url();
        // Check auth-related endpoints for token in response body
        if (url.includes('/auth') || url.includes('/login') || url.includes('/token') || url.includes('/signin')) {
            try {
                const body = await res.json();
                if (body?.token || body?.accessToken || body?.access_token) {
                    bearerToken = body.token || body.accessToken || body.access_token;
                    console.log('🔑 Bearer token captured from response:', url);
                }
            } catch {
                // Not JSON, skip
            }
        }
    });

    // Navigate to login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Fill and submit
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('#kt_login_signin_submit').click();

    // Wait for redirect away from login
    await page.waitForFunction(
        () => !window.location.pathname.includes('/login'),
        { timeout: 30000 }
    );
    await page.waitForLoadState('networkidle');

    // If still no token, navigate to a page that triggers API calls
    if (!bearerToken) {
        console.log('⏳ Token not captured yet, navigating to TA...');
        await page.goto('/talentattraction');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
    }

    // If STILL no token, try extracting from localStorage
    if (!bearerToken) {
        console.log('⏳ Trying localStorage extraction...');
        bearerToken = await page.evaluate(() => {
            // Try common localStorage keys for JWT tokens
            const keys = ['token', 'accessToken', 'access_token', 'jwt', 'auth_token', 'bearerToken',
                'jwtToken', 'authToken', 'user_token', 'session_token'];
            for (const key of keys) {
                const val = localStorage.getItem(key);
                if (val && val.startsWith('eyJ')) return val;
            }
            // Try checking all localStorage keys for JWT-like values
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key) continue;
                const val = localStorage.getItem(key);
                if (val && val.startsWith('eyJ') && val.length > 100) {
                    console.log('Found JWT-like value in localStorage key:', key);
                    return val;
                }
            }
            return '';
        });
    }

    // If STILL no token, try cookies
    if (!bearerToken) {
        console.log('⏳ Trying cookie extraction...');
        const cookies = await page.context().cookies();
        for (const cookie of cookies) {
            if (cookie.value.startsWith('eyJ') && cookie.value.length > 100) {
                // JWT-like cookie value
                console.log('Found JWT-like cookie:', cookie.name);
                bearerToken = cookie.value;
                break;
            }
        }
    }

    if (!bearerToken) {
        // Last resort: dump info for debugging
        const localStorageKeys = await page.evaluate(() => {
            const keys: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) keys.push(key);
            }
            return keys;
        });
        console.log('localStorage keys:', localStorageKeys);

        const cookies = await page.context().cookies();
        console.log('Cookie names:', cookies.map(c => `${c.name} (${c.value.substring(0, 20)}...)`));

        throw new Error('Failed to capture bearer token from network requests, localStorage, or cookies');
    }

    return bearerToken;
}

/**
 * Create an authenticated API request context using the bearer token.
 */
export async function createAuthenticatedApiContext(
    baseURL: string,
    bearerToken: string
): Promise<APIRequestContext> {
    return await playwrightRequest.newContext({
        baseURL,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
        },
    });
}
