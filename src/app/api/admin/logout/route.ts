import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, SUPER_ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const isProduction = process.env.NODE_ENV === 'production';
  const response = NextResponse.json({
    success: true,
    message: 'Admin session terminated.',
  });

  // Clear both admin & inherited super-admin cookies so Sign Out always succeeds cleanly
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    expires: new Date(0),
    maxAge: 0,
    path: '/',
  });

  response.cookies.set({
    name: SUPER_ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    expires: new Date(0),
    maxAge: 0,
    path: '/',
  });

  return response;
}
