import { NextRequest, NextResponse } from 'next/server';
import { validateSuperAdminPassword, generateSuperAdminSessionToken, SUPER_ADMIN_COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const isValidUser = !username || username.trim() === 'sksoftech_master' || username.trim() === 'sksoftech';
    if (!isValidUser || !password || !validateSuperAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid master credentials. Access denied.' },
        { status: 401 }
      );
    }

    const token = generateSuperAdminSessionToken(username || 'sksoftech_master');
    const isProduction = process.env.NODE_ENV === 'production';

    // Log the successful login in audit_logs
    try {
      const forwardedFor = req.headers.get('x-forwarded-for');
      const ip = (forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1').trim();
      const userAgent = req.headers.get('user-agent') || 'Unknown';

      await prisma.auditLog.create({
        data: {
          username: 'sksoftech_master',
          action: 'LOGIN',
          targetTable: 'users',
          targetId: 'super-admin',
          newValues: { status: 'Authenticated', role: 'SUPER_ADMIN' },
          ipAddress: ip,
          userAgent: userAgent,
        }
      });
    } catch (e) {
      console.error('Failed to write audit log on super admin login:', e);
    }

    const response = NextResponse.json({
      success: true,
      role: 'SUPER_ADMIN',
      message: 'Authentication successful. SK Softech Super Admin master session established.'
    });

    response.cookies.set({
      name: SUPER_ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login processing error' }, { status: 500 });
  }
}
