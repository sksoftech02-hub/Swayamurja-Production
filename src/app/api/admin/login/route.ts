import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  generateSessionToken,
  verifyPassword,
  getClientIp,
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
} from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateCheck = checkLoginRateLimit('admin', ip);
  if (rateCheck.limited) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed login attempts. Please retry after ${Math.ceil(rateCheck.retryAfterSec / 60)} minute(s).`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateCheck.retryAfterSec) },
      }
    );
  }

  try {
    const body = await req.json();
    const rawIdentifier = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!rawIdentifier || !password) {
      recordFailedLogin('admin', ip);
      return NextResponse.json(
        { success: false, error: 'Username (or email) and password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: rawIdentifier }, { email: rawIdentifier.toLowerCase() }],
      },
      include: { role: true },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      recordFailedLogin('admin', ip);
      return NextResponse.json(
        { success: false, error: 'Invalid username or password. Access denied.' },
        { status: 401 }
      );
    }

    if (user.role.roleCode !== 'ADMIN' && user.role.roleCode !== 'SUPER_ADMIN') {
      recordFailedLogin('admin', ip);
      return NextResponse.json(
        { success: false, error: 'Account does not have admin panel privileges.' },
        { status: 403 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'Your staff account has been frozen. Contact SK Softech Super Admin.' },
        { status: 403 }
      );
    }

    clearLoginAttempts('admin', ip);

    const token = generateSessionToken(user.username);
    const isProduction = process.env.NODE_ENV === 'production';

    // Update last login telemetry & write audit trail (non-blocking)
    try {
      const userAgent = req.headers.get('user-agent') || 'Unknown';
      await Promise.all([
        prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date(), lastLoginIp: ip },
        }),
        prisma.auditLog.create({
          data: {
            userId: user.id,
            roleId: user.roleId,
            username: user.username,
            action: 'ADMIN_LOGIN',
            targetTable: 'users',
            targetId: user.id,
            newValues: { status: 'Authenticated', role: user.role.roleCode },
            ipAddress: ip,
            userAgent,
          },
        }),
      ]);
    } catch (e) {
      console.error('Failed to record admin login telemetry:', e);
    }

    const response = NextResponse.json({
      success: true,
      username: user.username,
      fullName: user.fullName,
      role: user.role.roleCode,
      message: 'Authentication successful. Admin session established.',
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login processing error' },
      { status: 500 }
    );
  }
}
