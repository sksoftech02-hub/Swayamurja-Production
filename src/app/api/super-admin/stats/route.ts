import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const [
      leadsCount,
      usersCount,
      projectsCount,
      articlesCount,
      testimonialsCount,
      auditLogsCount,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.user.count(),
      prisma.project.count(),
      prisma.article.count(),
      prisma.testimonial.count(),
      prisma.auditLog.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        leadsCount,
        usersCount,
        projectsCount,
        articlesCount,
        testimonialsCount,
        auditLogsCount,
        database: 'PostgreSQL 18.2 (swayamurja_db)',
        engine: 'Prisma ORM v6.4.1',
        prismaStudioUrl: process.env.PRISMA_STUDIO_URL || null,
        status: 'HEALTHY',
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch system stats' }, { status: 500 });
  }
}
