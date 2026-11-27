import { NextRequest } from 'next/server';
import crypto from 'crypto';

export const SESSION_COOKIE_NAME = 'swayamurja_admin_session';
export const SUPER_ADMIN_COOKIE_NAME = 'swayamurja_super_admin_session';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const SCRYPT_KEY_LEN = 64;
const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 };

// Per-IP sliding-window brute-force limiter for login endpoints (bounded to prevent memory exhaustion)
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_LOGINS = 5;
const MAX_RATE_LIMIT_KEYS = 10_000;
const failedLoginMap = new Map<string, number[]>();

// Instant session revocation registry: username -> revokedAtMs
const revokedUsersMap = new Map<string, number>();

export function revokeUserSessions(username: string): void {
  const safeUser = username.replace(/[^a-zA-Z0-9_.-]/g, '');
  if (!safeUser) return;
  revokedUsersMap.set(safeUser, Date.now());
}

/**
 * Retrieves HMAC session signing secret strictly from environment variables.
 * Fails closed if no strong secret is configured.
 */
function getSessionSecret(): string {
  const secret = (process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || '').trim();
  if (!secret || secret.length < 16) {
    throw new Error('CRITICAL SECURITY CONFIG: SESSION_SECRET environment variable (min 16 chars) is required.');
  }
  return secret;
}

/**
 * Extracts client IP address cleanly from trusted reverse-proxy headers
 * (Cloudflare CF-Connecting-IP -> Nginx X-Real-IP -> X-Forwarded-For).
 */
export function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  if (cfIp) return cfIp;
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  return '127.0.0.1';
}

/**
 * Checks whether an IP + scope (admin / super_admin) is currently rate-limited.
 */
export function checkLoginRateLimit(scope: 'admin' | 'super_admin', ip: string): {
  limited: boolean;
  retryAfterSec: number;
} {
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const timestamps = (failedLoginMap.get(key) || []).filter((ts) => now - ts < LOGIN_WINDOW_MS);

  if (timestamps.length === 0) {
    failedLoginMap.delete(key);
    return { limited: false, retryAfterSec: 0 };
  }

  failedLoginMap.set(key, timestamps);
  if (timestamps.length >= MAX_FAILED_LOGINS) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((LOGIN_WINDOW_MS - (now - oldest)) / 1000));
    return { limited: true, retryAfterSec };
  }

  return { limited: false, retryAfterSec: 0 };
}

export function recordFailedLogin(scope: 'admin' | 'super_admin', ip: string): void {
  const key = `${scope}:${ip}`;
  const now = Date.now();
  if (failedLoginMap.size >= MAX_RATE_LIMIT_KEYS && !failedLoginMap.has(key)) {
    for (const [k, ts] of failedLoginMap) {
      if (ts.every((t) => now - t >= LOGIN_WINDOW_MS)) failedLoginMap.delete(k);
      if (failedLoginMap.size < MAX_RATE_LIMIT_KEYS) break;
    }
    if (failedLoginMap.size >= MAX_RATE_LIMIT_KEYS) {
      const oldestKey = failedLoginMap.keys().next().value;
      if (oldestKey) failedLoginMap.delete(oldestKey);
    }
  }
  const timestamps = (failedLoginMap.get(key) || []).filter((ts) => now - ts < LOGIN_WINDOW_MS);
  timestamps.push(now);
  failedLoginMap.set(key, timestamps);
}

export function clearLoginAttempts(scope: 'admin' | 'super_admin', ip: string): void {
  failedLoginMap.delete(`${scope}:${ip}`);
}

/**
 * Cryptographically hashes a password using Node's native scrypt KDF + 16-byte random salt.
 * Stored format: scrypt$<saltHex>$<derivedKeyHex>
 */
export function hashPassword(plainPassword: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(plainPassword, salt, SCRYPT_KEY_LEN, SCRYPT_PARAMS).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

/**
 * Verifies a plaintext password against a stored scrypt hash using constant-time comparison.
 */
export function verifyPassword(plainPassword: string, storedHash: string): boolean {
  if (!plainPassword || !storedHash || typeof plainPassword !== 'string' || typeof storedHash !== 'string') {
    return false;
  }

  if (!storedHash.startsWith('scrypt$')) {
    return false;
  }

  const parts = storedHash.split('$');
  if (parts.length !== 3) return false;

  const [, salt, expectedHex] = parts;
  if (!salt || !expectedHex) return false;

  try {
    const derived = crypto.scryptSync(plainPassword, salt, SCRYPT_KEY_LEN, SCRYPT_PARAMS);
    const expected = Buffer.from(expectedHex, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

/**
 * Constant-time string comparison for optional env-configured credentials.
 */
export function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Generates an HMAC-SHA256 signed session token for Super Admin.
 */
export function generateSuperAdminSessionToken(username: string): string {
  const safeUser = username.replace(/[^a-zA-Z0-9_.-]/g, '');
  const timestamp = Date.now();
  const payload = `super_admin:${safeUser}:${timestamp}`;
  const signature = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Generates an HMAC-SHA256 signed session token for Staff Admin.
 */
export function generateSessionToken(username = 'admin'): string {
  const safeUser = username.replace(/[^a-zA-Z0-9_.-]/g, '');
  const timestamp = Date.now();
  const payload = `admin:${safeUser}:${timestamp}`;
  const signature = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifies an HMAC-signed token and returns its parsed role & username if valid and unexpired.
 */
function parseAndVerifyToken(token: string | null | undefined): {
  role: 'admin' | 'super_admin';
  username: string;
} | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  if (!payload || !signature) return null;

  let secret: string;
  try {
    secret = getSessionSecret();
  } catch {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const signatureBuffer = Buffer.from(signature, 'utf-8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const segments = payload.split(':');
  // Support 3-part format `role:username:timestamp` (and legacy 2-part `admin:timestamp`)
  let role: string;
  let username: string;
  let timestampStr: string;

  if (segments.length === 3) {
    [role, username, timestampStr] = segments;
  } else if (segments.length === 2 && segments[0] === 'admin') {
    role = segments[0];
    username = 'admin';
    timestampStr = segments[1];
  } else {
    return null;
  }

  if (role !== 'admin' && role !== 'super_admin') return null;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp) || Date.now() - timestamp > SESSION_MAX_AGE_MS || timestamp > Date.now() + 60_000) {
    return null;
  }

  // Enforce instant revocation if user was frozen or deleted after token issuance
  const revokedAt = revokedUsersMap.get(username);
  if (revokedAt && timestamp <= revokedAt) {
    return null;
  }

  return { role, username };
}

export function verifySuperAdminSessionToken(token: string | null | undefined): boolean {
  const parsed = parseAndVerifyToken(token);
  return parsed?.role === 'super_admin';
}

export function verifySessionToken(token: string | null | undefined): boolean {
  const parsed = parseAndVerifyToken(token);
  return parsed?.role === 'admin' || parsed?.role === 'super_admin';
}

export function isAuthenticatedSuperAdmin(req: NextRequest): boolean {
  const cookie = req.cookies.get(SUPER_ADMIN_COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifySuperAdminSessionToken(cookie.value);
}

export function isAuthenticatedAdmin(req: NextRequest): boolean {
  const superCookie = req.cookies.get(SUPER_ADMIN_COOKIE_NAME);
  if (superCookie?.value && verifySuperAdminSessionToken(superCookie.value)) {
    return true;
  }
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifySessionToken(cookie.value);
}

export function getAuthenticatedActor(req: NextRequest): { role: 'admin' | 'super_admin'; username: string } | null {
  const superCookie = req.cookies.get(SUPER_ADMIN_COOKIE_NAME);
  if (superCookie?.value) {
    const parsedSuper = parseAndVerifyToken(superCookie.value);
    if (parsedSuper?.role === 'super_admin') return parsedSuper;
  }
  const adminCookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (adminCookie?.value) {
    const parsedAdmin = parseAndVerifyToken(adminCookie.value);
    if (parsedAdmin) return parsedAdmin;
  }
  return null;
}
