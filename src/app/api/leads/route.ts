import { NextRequest, NextResponse } from 'next/server';
import { LeadStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import { Lead } from '@/lib/types';
import {
  isAuthenticatedAdmin,
  getAuthenticatedActor,
  getClientIp,
} from '@/lib/auth';

// Simple in-memory rate limiter for public lead submissions: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 6, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function sanitizeString(str: unknown, maxLen = 500): string {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLen).replace(/[<>]/g, '').trim();
}

function parseMonthlyBill(raw: unknown): number {
  if (typeof raw === 'number' && Number.isFinite(raw) && raw >= 0) return raw;
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    if (Number.isFinite(parsed) && parsed >= 0) return Math.min(parsed, 999999999);
  }
  return 0;
}

const UI_TO_DB_STATUS: Record<Lead['status'], LeadStatus> = {
  New: LeadStatus.NEW,
  Contacted: LeadStatus.CONTACTED,
  'Site Survey Scheduled': LeadStatus.SITE_SURVEY_SCHEDULED,
  'Deal Closed': LeadStatus.WON_CLOSED,
  Dropped: LeadStatus.LOST,
};

const DB_TO_UI_STATUS: Record<LeadStatus, Lead['status']> = {
  [LeadStatus.NEW]: 'New',
  [LeadStatus.CONTACTED]: 'Contacted',
  [LeadStatus.SITE_SURVEY_SCHEDULED]: 'Site Survey Scheduled',
  [LeadStatus.PROPOSAL_SENT]: 'Site Survey Scheduled',
  [LeadStatus.WON_CLOSED]: 'Deal Closed',
  [LeadStatus.LOST]: 'Dropped',
};

function mapPrismaLeadToUi(row: {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  serviceType: string;
  monthlyBill: unknown;
  city: string;
  notes: string | null;
  status: LeadStatus;
  createdAt: Date;
}): Lead {
  const numericBill = Number(row.monthlyBill || 0);
  return {
    id: row.id,
    name: row.fullName,
    phone: row.phone,
    email: row.email || undefined,
    service: row.serviceType,
    monthlyBill: numericBill > 0 ? `₹ ${Math.round(numericBill).toLocaleString('en-IN')}` : undefined,
    city: row.city,
    notes: row.notes || undefined,
    status: DB_TO_UI_STATUS[row.status] || 'New',
    createdAt: row.createdAt.toISOString(),
  };
}

/**
 * GET /api/leads - Protected endpoint returning unified PostgreSQL leads
 */
export async function GET(req: NextRequest) {
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required to access customer leads.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const rawLimit = Number(searchParams.get('limit') || 200);
    const take = Number.isFinite(rawLimit) ? Math.min(Math.max(1, Math.floor(rawLimit)), 500) : 200;
    const rawOffset = Number(searchParams.get('offset') || 0);
    const skip = Number.isFinite(rawOffset) ? Math.max(0, Math.floor(rawOffset)) : 0;

    const [rows, total] = await Promise.all([
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.lead.count(),
    ]);
    return NextResponse.json({
      success: true,
      total,
      leads: rows.map(mapPrismaLeadToUi),
    });
  } catch (error) {
    console.error('Failed to fetch PostgreSQL leads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

/**
 * POST /api/leads - Public inquiry submission persisted directly in PostgreSQL
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip, 6, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait 10 minutes before submitting another inquiry.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      service,
      monthlyBill,
      recommendedKw,
      subsidyAmount,
      city,
      notes,
      dpdpConsent,
      privacyPolicyVersion,
    } = body;

    // 0. Enforce DPDP Act, 2023 affirmative consent
    if (dpdpConsent !== true) {
      return NextResponse.json(
        {
          success: false,
          error: 'Explicit consent under the DPDP Act, 2023 Privacy Notice is required to submit your inquiry.',
        },
        { status: 400 }
      );
    }

    // 1. Validate & sanitize Name
    const sanitizedName = sanitizeString(name, 100);
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Valid name is required (min 2 characters)' },
        { status: 400 }
      );
    }

    // 2. Validate & sanitize Indian Mobile Number
    const cleanedPhone = (typeof phone === 'string' ? phone : '').replace(/[^0-9]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit Indian mobile number is required' },
        { status: 400 }
      );
    }

    // 3. Validate optional Email syntax if provided
    const sanitizedEmail = email ? sanitizeString(email, 120).toLowerCase() : '';
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const sanitizedService = sanitizeString(service, 100) || 'General Solar Enquiry';
    const sanitizedCity = sanitizeString(city, 80) || 'Maharashtra';

    const consentTimestamp = new Date().toISOString();
    const policyVer = sanitizeString(privacyPolicyVersion, 40) || 'DPDP-2023-v1.0';
    const noteParts: string[] = [];
    if (recommendedKw) noteParts.push(`Recommended: ${sanitizeString(recommendedKw, 50)}`);
    if (subsidyAmount) noteParts.push(`Subsidy: ${sanitizeString(subsidyAmount, 50)}`);
    if (notes) noteParts.push(sanitizeString(notes, 1000));
    noteParts.push(`[DPDP Consent: ${policyVer} @ ${consentTimestamp}]`);
    const combinedNotes = noteParts.join(' | ');

    const created = await prisma.lead.create({
      data: {
        fullName: sanitizedName,
        phone: cleanedPhone,
        email: sanitizedEmail || null,
        serviceType: sanitizedService,
        monthlyBill: parseMonthlyBill(monthlyBill),
        city: sanitizedCity,
        notes: combinedNotes,
        status: LeadStatus.NEW,
      },
    });

    // Record verifiable DPDP Section 6 consent proof in audit_logs
    try {
      await prisma.auditLog.create({
        data: {
          username: 'public_visitor',
          action: 'LEAD_CONSENT_RECORDED',
          targetTable: 'leads',
          targetId: created.id,
          newValues: {
            consentGiven: true,
            privacyPolicyVersion: policyVer,
            consentTimestamp,
          },
          ipAddress: ip,
          userAgent: req.headers.get('user-agent') || 'Unknown',
        },
      });
    } catch (_) {}

    return NextResponse.json({
      success: true,
      lead: mapPrismaLeadToUi(created),
    });
  } catch (error) {
    console.error('Failed to process inquiry submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to process inquiry submission' }, { status: 500 });
  }
}

/**
 * PATCH /api/leads - Protected endpoint to update lead status in PostgreSQL with strict enum validation
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

    if (!id || typeof id !== 'string' || !status || typeof status !== 'string') {
      return NextResponse.json({ success: false, error: 'ID and Status are required.' }, { status: 400 });
    }

    const mappedStatus = UI_TO_DB_STATUS[status as Lead['status']];
    if (!mappedStatus) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid lead status. Allowed values: ${Object.keys(UI_TO_DB_STATUS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: { status: mappedStatus },
    });

    try {
      const actor = getAuthenticatedActor(req);
      await Promise.all([
        prisma.leadStatusHistory.create({
          data: {
            leadId: id,
            oldStatus: existing.status,
            newStatus: mappedStatus,
            comment: `Status updated by ${actor?.username || 'admin'}`,
          },
        }),
        prisma.auditLog.create({
          data: {
            username: actor?.username || 'admin',
            action: 'UPDATE_LEAD_STATUS',
            targetTable: 'leads',
            targetId: id,
            oldValues: { status: existing.status },
            newValues: { status: mappedStatus },
            ipAddress: getClientIp(req),
          },
        }),
      ]);
    } catch (_) {}

    return NextResponse.json({
      success: true,
      lead: mapPrismaLeadToUi(updated),
    });
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead status' }, { status: 500 });
  }
}

/**
 * DELETE /api/leads?id=... - Protected endpoint to erase a customer lead (CRM cleanup & DPDP Right to Erasure)
 */
export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required.' }, { status: 400 });
    }

    const existing = await prisma.lead.findUnique({
      where: { id },
      select: { id: true, fullName: true, phone: true },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    await prisma.lead.delete({ where: { id } });

    try {
      const actor = getAuthenticatedActor(req);
      await prisma.auditLog.create({
        data: {
          username: actor?.username || 'admin',
          action: 'DELETE_LEAD',
          targetTable: 'leads',
          targetId: id,
          oldValues: { fullName: existing.fullName, phoneLast4: existing.phone.slice(-4) },
          ipAddress: getClientIp(req),
        },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, message: 'Lead permanently deleted.' });
  } catch (error) {
    console.error('Failed to delete lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}
