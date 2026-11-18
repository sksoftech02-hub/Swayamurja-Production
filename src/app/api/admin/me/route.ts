import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const isSuper = isAuthenticatedSuperAdmin(req);
  const authenticated = isSuper || isAuthenticatedAdmin(req);
  return NextResponse.json({
    success: true,
    authenticated,
    isSuperAdmin: isSuper
  });
}
