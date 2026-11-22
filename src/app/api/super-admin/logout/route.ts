import { NextResponse } from 'next/server';
import { SUPER_ADMIN_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const isProduction = process.env.NODE_ENV === 'production';
  const response = NextResponse.json({
    success: true,
    message: 'Super Admin master session terminated.',
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

  return response;
}
