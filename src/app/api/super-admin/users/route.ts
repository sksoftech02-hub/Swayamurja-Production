import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

/**
 * GET /api/super-admin/users - List all users with their roles
 */
export async function GET(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const safeUsers = users.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.fullName,
      phone: u.phone,
      isActive: u.isActive,
      role: u.role.roleCode,
      roleName: u.role.roleName,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
    }));

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}

/**
 * POST /api/super-admin/users - Create new Admin account for SwayamUrja staff
 */
export async function POST(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { username, email, fullName, phone, password, roleCode = 'ADMIN' } = body;

    if (!username || !email || !fullName || !password) {
      return NextResponse.json({ success: false, error: 'Username, Email, Full Name, and Password are required.' }, { status: 400 });
    }

    // Find role
    const role = await prisma.role.findUnique({
      where: { roleCode: roleCode },
    });
    if (!role) {
      return NextResponse.json({ success: false, error: `Invalid role: ${roleCode}` }, { status: 400 });
    }

    // Check existing
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username: username.trim() }, { email: email.trim() }],
      },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Username or Email is already in use.' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        fullName: fullName.trim(),
        phone: phone ? phone.trim() : null,
        passwordHash: `$argon2id$v=19$m=65536,t=3,p=4$default$${password}`, // Simple hash format for demo
        roleId: role.id,
        isActive: true,
      },
    });

    // Create Audit Log
    try {
      const forwardedFor = req.headers.get('x-forwarded-for');
      const ip = (forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1').trim();
      await prisma.auditLog.create({
        data: {
          username: 'sksoftech_master',
          action: 'CREATE_USER',
          targetTable: 'users',
          targetId: newUser.id,
          newValues: { username: newUser.username, role: roleCode, fullName: newUser.fullName },
          ipAddress: ip,
        },
      });
    } catch (_) {}

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: role.roleCode,
        isActive: newUser.isActive,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}

/**
 * PATCH /api/super-admin/users - Toggle active status or freeze staff account
 */
export async function PATCH(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isActive } = body;

    if (!id || typeof isActive !== 'boolean') {
      return NextResponse.json({ success: false, error: 'User ID and isActive boolean are required.' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive },
    });

    try {
      const forwardedFor = req.headers.get('x-forwarded-for');
      const ip = (forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1').trim();
      await prisma.auditLog.create({
        data: {
          username: 'sksoftech_master',
          action: isActive ? 'UNFREEZE_USER' : 'FREEZE_USER',
          targetTable: 'users',
          targetId: id,
          newValues: { isActive },
          ipAddress: ip,
        },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
  }
}

/**
 * DELETE /api/super-admin/users - Delete a staff account
 */
export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required.' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (targetUser?.role.roleCode === 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Cannot delete Super Admin root account.' }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id },
    });

    try {
      const forwardedFor = req.headers.get('x-forwarded-for');
      const ip = (forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1').trim();
      await prisma.auditLog.create({
        data: {
          username: 'sksoftech_master',
          action: 'DELETE_USER',
          targetTable: 'users',
          targetId: id,
          oldValues: { username: targetUser?.username },
          ipAddress: ip,
        },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
  }
}
