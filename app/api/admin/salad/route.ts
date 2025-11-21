import { NextResponse } from 'next/server'
import { SaladOfTheDay } from '@/types'

// In production, this would save to a database
// For now, we'll use a simple in-memory store (will reset on server restart)
let currentSalad: SaladOfTheDay | null = null

export async function GET() {
  return NextResponse.json(currentSalad)
}

export async function POST(request: Request) {
  try {
    const salad: SaladOfTheDay = await request.json()
    currentSalad = salad
    // TODO: Save to database
    return NextResponse.json({ success: true, salad })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save salad' }, { status: 500 })
  }
}


