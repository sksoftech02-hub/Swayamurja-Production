import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const SESSION_COOKIE_NAME = 'swayamurja_admin_session';
export const SUPER_ADMIN_COOKIE_NAME = 'swayamurja_super_admin_session';

// Secret key for HMAC signature (use environment variable in production)
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'swayamurja-secret-key-pune-2026-secure-session-salt-98271';

// Supported admin passwords
const VALID_PASSWORDS = [
  process.env.ADMIN_PASSWORD || 'swayamurja@2026',
  'admin123',
  'swayamurja@epc2026'
];

// Super Admin master credentials for SK Softech
const VALID_SUPER_ADMIN_PASSWORDS = [
  process.env.SUPER_ADMIN_PASSWORD || 'sksoftech@2026',
  'sksoftech#master',
  'superadmin2026'
];

export function validateSuperAdminPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  return VALID_SUPER_ADMIN_PASSWORDS.includes(password.trim());
}

/**
 * Validates an entered admin password against authorized credentials
 */
export function validateAdminPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  return VALID_PASSWORDS.includes(password.trim());
}

/**
 * Generates an HMAC-signed session token for Super Admin (sksoftech)
 */
export function generateSuperAdminSessionToken(username = 'sksoftech_master'): string {
  const timestamp = Date.now();
  const payload = `super_admin:${username}:${timestamp}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Generates an HMAC-signed session token valid for 7 days
 */
export function generateSessionToken(): string {
  const timestamp = Date.now();
  const payload = `admin:${timestamp}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifies if an HMAC super admin session token is authentic and not expired
 */
export function verifySuperAdminSessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  
  const signatureBuffer = Buffer.from(signature, 'utf-8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }
  
  const [role, username, timestampStr] = payload.split(':');
  if (role !== 'super_admin') return false;
  
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAgeMs) {
    return false;
  }
  
  return true;
}

/**
 * Verifies if an HMAC session token is authentic and not expired
 */
export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  
  // Constant-time comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(signature, 'utf-8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }
  
  const [role, timestampStr] = payload.split(':');
  if (role !== 'admin' && role !== 'super_admin') return false;
  
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  
  // Expire after 7 days (7 * 24 * 60 * 60 * 1000 ms)
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAgeMs) {
    return false;
  }
  
  return true;
}

/**
 * Helper to check if incoming NextRequest has an active, authenticated super admin session
 */
export function isAuthenticatedSuperAdmin(req: NextRequest): boolean {
  const cookie = req.cookies.get(SUPER_ADMIN_COOKIE_NAME);
  if (!cookie || !cookie.value) return false;
  return verifySuperAdminSessionToken(cookie.value);
}

/**
 * Helper to check if incoming NextRequest has an active, authenticated admin or super admin session
 */
export function isAuthenticatedAdmin(req: NextRequest): boolean {
  // Super admin inherits all admin capabilities
  const superCookie = req.cookies.get(SUPER_ADMIN_COOKIE_NAME);
  if (superCookie && superCookie.value && verifySuperAdminSessionToken(superCookie.value)) {
    return true;
  }

  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) return false;
  return verifySessionToken(cookie.value);
}
