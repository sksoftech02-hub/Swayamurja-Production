import { NextRequest, NextResponse } from 'next/server';
import {
  SUPER_ADMIN_COOKIE_NAME,
  generateSuperAdminSessionToken,
  verifyPassword,
  getClientIp,
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
} from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateCheck = checkLoginRateLimit('super_admin', ip);
  if (rateCheck.limited) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed root login attempts. Retry after ${Math.ceil(rateCheck.retryAfterSec / 60)} minute(s).`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateCheck.retryAfterSec) },
      }
    );
  }

  try {
    const body = await req.json();
    const username = typeof body?.username === 'string' ? body.username.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!username || !password) {
      recordFailedLogin('super_admin', ip);
      return NextResponse.json(
        { success: false, error: 'Operator username and master password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username.toLowerCase() }],
      },
      include: { role: true },
    });

    if (!user || user.role.roleCode !== 'SUPER_ADMIN' || !verifyPassword(password, user.passwordHash)) {
      recordFailedLogin('super_admin', ip);
      return NextResponse.json(
        { success: false, error: 'Invalid master credentials. Access denied.' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'Root operator account is deactivated.' },
        { status: 403 }
      );
    }

    clearLoginAttempts('super_admin', ip);

    const token = generateSuperAdminSessionToken(user.username);
    const isProduction = process.env.NODE_ENV === 'production';

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
            action: 'LOGIN',
            targetTable: 'users',
            targetId: user.id,
            newValues: { status: 'Authenticated', role: 'SUPER_ADMIN' },
            ipAddress: ip,
            userAgent,
          },
        }),
      ]);
    } catch (e) {
      console.error('Failed to write audit log on super admin login:', e);
    }

    const response = NextResponse.json({
      success: true,
      role: 'SUPER_ADMIN',
      username: user.username,
      message: 'Authentication successful. SK Softech Super Admin master session established.',
    });

    response.cookies.set({
      name: SUPER_ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Super Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Login processing error' }, { status: 500 });
  }
}
