import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { Menu } from '@/types'
import { setCurrentMenu, getCurrentMenu } from '@/lib/sharedState'

// In production, use a proper file storage service (S3, Cloudinary, etc.)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const type = formData.get('type') as string

    if (!file || !name) {
      return NextResponse.json({ error: 'Missing file or name' }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'menus')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch {
      // Directory might already exist
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = join(uploadsDir, fileName)

    await writeFile(filePath, buffer)

    // Create menu object
    const menu: Menu = {
      id: Date.now().toString(),
      name,
      type: type as any,
      imageUrl: `/uploads/menus/${fileName}`,
      pdfUrl: file.name.endsWith('.pdf') ? `/uploads/menus/${fileName}` : undefined,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Admin',
      isActive: true,
    }

    setCurrentMenu(menu)

    return NextResponse.json({ success: true, menu })
  } catch (error) {
    console.error('Error uploading menu:', error)
    return NextResponse.json({ error: 'Failed to upload menu' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(getCurrentMenu())
}

