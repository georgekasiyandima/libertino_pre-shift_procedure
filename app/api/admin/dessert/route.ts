import { NextResponse } from 'next/server'
import { DessertOfTheDay } from '@/types'

let currentDessert: DessertOfTheDay | null = null

export async function GET() {
  return NextResponse.json(currentDessert)
}

export async function POST(request: Request) {
  try {
    const dessert: DessertOfTheDay = await request.json()
    currentDessert = dessert
    return NextResponse.json({ success: true, dessert })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save dessert' }, { status: 500 })
  }
}


