import { NextResponse } from 'next/server'
import { FloorMessage } from '@/types'
import { addFloorMessage, getFloorMessages } from '@/lib/sharedState'

export async function GET() {
  return NextResponse.json(getFloorMessages())
}

export async function POST(request: Request) {
  try {
    const data: Partial<FloorMessage> = await request.json()
    const newMessage: FloorMessage = {
      id: Date.now().toString(),
      type: data.type || 'update',
      message: data.message || '',
      section: data.section || 'All',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      expiresAt: data.expiresAt,
    }
    addFloorMessage(newMessage)
    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error('Error creating floor message:', error)
    return NextResponse.json({ error: 'Failed to create floor message' }, { status: 500 })
  }
}

