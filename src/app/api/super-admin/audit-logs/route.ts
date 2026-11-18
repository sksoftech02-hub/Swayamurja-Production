import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const logs = await prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        role: true,
      },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}
