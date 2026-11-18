import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Admin session terminated.'
  });

  // Clear HTTP-only session cookie
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });

  return response;
}
