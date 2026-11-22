import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedSuperAdmin, getAuthenticatedActor } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const authenticated = isAuthenticatedSuperAdmin(req);
  const actor = authenticated ? getAuthenticatedActor(req) : null;
  return NextResponse.json({
    success: true,
    authenticated,
    role: authenticated ? 'SUPER_ADMIN' : null,
    operator: authenticated ? (actor?.username || 'SUPER_ADMIN') : null,
  });
}
