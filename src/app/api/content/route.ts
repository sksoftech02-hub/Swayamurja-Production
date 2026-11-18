import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const content = getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Reject unauthenticated requests from unauthorized visitors
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required to update website content.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const updated = updateSiteContent(body);
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
