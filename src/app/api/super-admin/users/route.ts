import { NextRequest, NextResponse } from 'next/server';
import {
  isAuthenticatedSuperAdmin,
  hashPassword,
  getClientIp,
  getAuthenticatedActor,
} from '@/lib/auth';
import { prisma } from '@/lib/db';

const SAFE_USER_SELECT = {
  id: true,
  username: true,
  email: true,
  fullName: true,
  phone: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  role: {
    select: {
      roleCode: true,
      roleName: true,
    },
  },
};

/**
 * GET /api/super-admin/users - List all users with their roles (never selects passwordHash)
 */
export async function GET(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: SAFE_USER_SELECT,
      orderBy: { createdAt: 'desc' },
    });

    const safeUsers = users.map((u) => ({
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
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}

/**
 * POST /api/super-admin/users - Create new Admin account with scrypt password hashing
 */
export async function POST(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const username = typeof body?.username === 'string' ? body.username.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const roleCode = typeof body?.roleCode === 'string' ? body.roleCode.trim() : 'ADMIN';

    if (!username || !email || !fullName || !password) {
      return NextResponse.json(
        { success: false, error: 'Username, Email, Full Name, and Password are required.' },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9_.-]{3,50}$/.test(username)) {
      return NextResponse.json(
        { success: false, error: 'Username must be 3–50 characters (letters, numbers, _, ., -).' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Valid email address is required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const role = await prisma.role.findUnique({ where: { roleCode } });
    if (!role) {
      return NextResponse.json({ success: false, error: `Invalid role: ${roleCode}` }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Username or Email is already in use.' }, { status: 409 });
    }

    const hashed = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        fullName,
        phone: phone || null,
        passwordHash: hashed,
        roleId: role.id,
        isActive: true,
      },
      select: SAFE_USER_SELECT,
    });

    try {
      const actor = getAuthenticatedActor(req);
      await prisma.auditLog.create({
        data: {
          username: actor?.username || 'sksoftech_master',
          action: 'CREATE_USER',
          targetTable: 'users',
          targetId: newUser.id,
          newValues: { username: newUser.username, role: role.roleCode, fullName: newUser.fullName },
          ipAddress: getClientIp(req),
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
        phone: newUser.phone,
        role: newUser.role.roleCode,
        roleName: newUser.role.roleName,
        isActive: newUser.isActive,
      },
    });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}

/**
 * PATCH /api/super-admin/users - Toggle active status or freeze staff account (never leaks passwordHash)
 */
export async function PATCH(req: NextRequest) {
  if (!isAuthenticatedSuperAdmin(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Super Admin access required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isActive } = body;

    if (!id || typeof id !== 'string' || typeof isActive !== 'boolean') {
      return NextResponse.json({ success: false, error: 'User ID and isActive boolean are required.' }, { status: 400 });
    }

    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, role: { select: { roleCode: true } } },
    });

    if (!target) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    if (target.role.roleCode === 'SUPER_ADMIN' && !isActive) {
      return NextResponse.json(
        { success: false, error: 'Cannot freeze a Super Admin root account.' },
        { status: 403 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: SAFE_USER_SELECT,
    });

    try {
      const actor = getAuthenticatedActor(req);
      await prisma.auditLog.create({
        data: {
          username: actor?.username || 'sksoftech_master',
          action: isActive ? 'UNFREEZE_USER' : 'FREEZE_USER',
          targetTable: 'users',
          targetId: id,
          newValues: { username: updated.username, isActive },
          ipAddress: getClientIp(req),
        },
      });
    } catch (_) {}

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        username: updated.username,
        email: updated.email,
        fullName: updated.fullName,
        phone: updated.phone,
        isActive: updated.isActive,
        role: updated.role.roleCode,
        roleName: updated.role.roleName,
      },
    });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
  }
}

/**
 * DELETE /api/super-admin/users - Permanently delete a staff account (protects SUPER_ADMIN)
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
      select: { id: true, username: true, role: { select: { roleCode: true } } },
    });

    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    if (targetUser.role.roleCode === 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Cannot delete Super Admin root account.' }, { status: 403 });
    }

    await prisma.user.delete({ where: { id } });

    try {
      const actor = getAuthenticatedActor(req);
      await prisma.auditLog.create({
        data: {
          username: actor?.username || 'sksoftech_master',
          action: 'DELETE_USER',
          targetTable: 'users',
          targetId: id,
          oldValues: { username: targetUser.username },
          ipAddress: getClientIp(req),
        },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
  }
}
