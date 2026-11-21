import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Sanitize folder name
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique safe filename
    const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const filename = `${Date.now()}-${cleanOriginalName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('File upload failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'File upload failed' }, { status: 500 });
  }
}
