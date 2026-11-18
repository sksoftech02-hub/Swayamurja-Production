import { NextRequest, NextResponse } from 'next/server';
import { validateAdminPassword, generateSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || !validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password. Access denied.' },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Admin session established.'
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login processing error' },
      { status: 500 }
    );
  }
}
