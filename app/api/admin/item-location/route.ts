import { NextResponse } from 'next/server'
import { ItemLocation } from '@/types'

let itemLocations: ItemLocation[] = []

export async function GET() {
  return NextResponse.json(itemLocations)
}

export async function POST(request: Request) {
  try {
    const data: Partial<ItemLocation> = await request.json()
    const newItem: ItemLocation = {
      id: Date.now().toString(),
      item: data.item || '',
      location: data.location || '',
      section: data.section || 'Storage',
      quantity: data.quantity,
      notes: data.notes,
    }
    itemLocations.push(newItem)
    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item location' }, { status: 500 })
  }
}


