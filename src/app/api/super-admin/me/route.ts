import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedSuperAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const authenticated = isAuthenticatedSuperAdmin(req);
  return NextResponse.json({
    success: true,
    authenticated,
    role: authenticated ? 'SUPER_ADMIN' : null,
    operator: 'SK Softech Root'
  });
}
