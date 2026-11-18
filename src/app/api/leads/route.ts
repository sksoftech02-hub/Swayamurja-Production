import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLead, updateLeadStatus } from '@/lib/leads-store';
import { isAuthenticatedAdmin } from '@/lib/auth';

// Simple in-memory rate limiter: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Basic HTML sanitization to prevent Stored XSS
function sanitizeString(str: unknown, maxLen = 500): string {
  if (typeof str !== 'string') return '';
  return str
    .slice(0, maxLen)
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * GET /api/leads - Protected endpoint to view inquiries (Admin only)
 */
export async function GET(req: NextRequest) {
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required to access customer leads.' },
      { status: 401 }
    );
  }

  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

/**
 * POST /api/leads - Public inquiry submission with rate limiting and sanitization
 */
export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction and rate-limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = (forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1').trim();

    if (isRateLimited(ip, 6, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting another inquiry.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, phone, email, service, monthlyBill, recommendedKw, subsidyAmount, city, notes } = body;

    // 2. Validate & sanitize Name
    const sanitizedName = sanitizeString(name, 100);
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Valid name is required (min 2 characters)' },
        { status: 400 }
      );
    }

    // 3. Validate & sanitize Indian Mobile Number
    const cleanedPhone = (typeof phone === 'string' ? phone : '').replace(/[^0-9]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit Indian mobile number is required' },
        { status: 400 }
      );
    }

    // 4. Sanitize optional fields
    const sanitizedEmail = email ? sanitizeString(email, 120) : undefined;
    const sanitizedService = sanitizeString(service, 100) || 'General Solar Enquiry';
    const sanitizedCity = sanitizeString(city, 80) || 'Maharashtra';
    const sanitizedNotes = notes ? sanitizeString(notes, 1000) : undefined;

    const newLead = saveLead({
      name: sanitizedName,
      phone: cleanedPhone,
      email: sanitizedEmail,
      service: sanitizedService,
      monthlyBill: monthlyBill ? sanitizeString(monthlyBill, 50) : undefined,
      recommendedKw: recommendedKw ? sanitizeString(recommendedKw, 50) : undefined,
      subsidyAmount: subsidyAmount ? sanitizeString(subsidyAmount, 50) : undefined,
      city: sanitizedCity,
      notes: sanitizedNotes,
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process inquiry submission' }, { status: 500 });
  }
}

/**
 * PATCH /api/leads - Protected endpoint to update lead status (Admin only)
 */
export async function PATCH(req: NextRequest) {
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and Status are required' }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update lead status' }, { status: 500 });
  }
}
