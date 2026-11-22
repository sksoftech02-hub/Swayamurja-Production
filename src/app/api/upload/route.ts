import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } from '@/lib/auth';

const ALLOWED_FOLDERS = new Set(['clients', 'team', 'projects', 'video', 'general']);

const IMAGE_MIME_TO_EXT: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

const VIDEO_MIME_TO_EXT: Record<string, string[]> = {
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB

/**
 * Verifies real binary magic bytes so spoofed HTML/JS/SVG files cannot bypass MIME checks.
 */
function hasValidMagicBytes(buf: Buffer, mimeType: string): boolean {
  if (buf.length < 12) return false;

  if (mimeType === 'image/jpeg') {
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  }
  if (mimeType === 'image/png') {
    return (
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47 &&
      buf[4] === 0x0d &&
      buf[5] === 0x0a &&
      buf[6] === 0x1a &&
      buf[7] === 0x0a
    );
  }
  if (mimeType === 'image/webp') {
    return buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP';
  }
  if (mimeType === 'video/mp4') {
    return buf.subarray(4, 8).toString('ascii') === 'ftyp';
  }
  if (mimeType === 'video/webm') {
    return buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3;
  }
  return false;
}

export async function POST(req: NextRequest) {
  // 1. Strict authentication check
  if (!isAuthenticatedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required to upload files.' },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const rawFolder = (formData.get('folder') as string) || 'general';

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
    }

    // 2. Folder allowlist check
    const safeFolder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
    if (!ALLOWED_FOLDERS.has(safeFolder)) {
      return NextResponse.json({ success: false, error: 'Invalid upload destination folder.' }, { status: 400 });
    }

    // 3. Determine image vs video rules
    const mimeType = (file.type || '').toLowerCase();
    const ext = path.extname(file.name || '').toLowerCase();
    const isVideo = safeFolder === 'video' || mimeType.startsWith('video/');

    if (isVideo) {
      if (!isAuthenticatedSuperAdmin(req)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Super Admin access required for video uploads.' },
          { status: 403 }
        );
      }
      const allowedExts = VIDEO_MIME_TO_EXT[mimeType];
      if (!allowedExts || !allowedExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: 'Unsupported video format. Only MP4 and WebM are permitted.' },
          { status: 400 }
        );
      }
      if (file.size > MAX_VIDEO_BYTES) {
        return NextResponse.json(
          { success: false, error: 'Video exceeds maximum allowed size of 50 MB.' },
          { status: 413 }
        );
      }
    } else {
      const allowedExts = IMAGE_MIME_TO_EXT[mimeType];
      if (!allowedExts || !allowedExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: 'Unsupported image format. Only JPEG, PNG, and WebP are permitted.' },
          { status: 400 }
        );
      }
      if (file.size > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { success: false, error: 'Image exceeds maximum allowed size of 5 MB.' },
          { status: 413 }
        );
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Magic-byte signature verification
    if (!hasValidMagicBytes(buffer, mimeType)) {
      return NextResponse.json(
        { success: false, error: 'File content does not match its declared media format.' },
        { status: 400 }
      );
    }

    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
    const uploadsDir = path.resolve(uploadsRoot, safeFolder);
    if (!uploadsDir.startsWith(uploadsRoot)) {
      return NextResponse.json({ success: false, error: 'Invalid target directory.' }, { status: 400 });
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 5. Randomized safe filename (prevents path traversal & name collisions)
    const canonicalExt = isVideo
      ? VIDEO_MIME_TO_EXT[mimeType][0]
      : IMAGE_MIME_TO_EXT[mimeType][0];
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${canonicalExt}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: buffer.length,
      mimeType,
    });
  } catch (error) {
    console.error('File upload failed:', error);
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}
