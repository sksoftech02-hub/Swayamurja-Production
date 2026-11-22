import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent, SiteContent } from '@/lib/content-store';
import { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } from '@/lib/auth';

// Root-only keys that regular Staff Admins are forbidden from mutating
const SUPER_ADMIN_ONLY_KEYS: Array<keyof SiteContent> = [
  'theme',
  'tariffs',
  'stats',
  'companyContact',
  'announcement',
  'layoutSections',
  'videoSection',
];

function stableEquals(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

export async function GET() {
  try {
    const content = getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // 1. Reject unauthenticated visitors
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required to update website content.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: 'Invalid content payload.' }, { status: 400 });
    }

    // 2. Enforce server-side field-level RBAC for Root-only settings
    const isSuper = isAuthenticatedSuperAdmin(req);
    if (!isSuper) {
      const current = getSiteContent();
      const forbiddenChanges: string[] = [];

      for (const key of SUPER_ADMIN_ONLY_KEYS) {
        if (key in body && body[key] !== undefined && !stableEquals(body[key], current[key])) {
          forbiddenChanges.push(String(key));
        }
      }

      if (forbiddenChanges.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Super Admin privileges are required to modify protected settings (${forbiddenChanges.join(', ')}).`,
          },
          { status: 403 }
        );
      }
    }

    const updated = updateSiteContent(body);
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    console.error('Failed to update content:', error);
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
