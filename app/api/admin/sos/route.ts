import { NextResponse } from 'next/server'
import { SOSMessage } from '@/types'
import { addSOSMessage, getSOSMessages, resolveSOSMessage } from '@/lib/sharedState'

export async function GET() {
  return NextResponse.json(getSOSMessages())
}

export async function POST(request: Request) {
  try {
    const data: Partial<SOSMessage> = await request.json()
    const newMessage: SOSMessage = {
      id: Date.now().toString(),
      type: data.type || 'location',
      title: data.title || '',
      message: data.message || '',
      location: data.location,
      priority: data.priority || 'medium',
      createdBy: data.createdBy || 'Admin',
      createdAt: new Date().toISOString(),
      resolved: false,
    }
    addSOSMessage(newMessage)
    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error('Error creating SOS message:', error)
    return NextResponse.json({ error: 'Failed to create SOS message' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()
    resolveSOSMessage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resolving SOS message:', error)
    return NextResponse.json({ error: 'Failed to resolve message' }, { status: 500 })
  }
}

