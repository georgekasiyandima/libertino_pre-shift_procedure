/**
 * DinePlan API Integration Utility
 * 
 * This module provides functions to interact with the DinePlan API
 * for fetching reservation data.
 * 
 * Setup Instructions:
 * 1. Obtain your DinePlan API credentials from your DinePlan account
 * 2. Add them to your .env.local file:
 *    DINEPLAN_API_KEY=your_api_key_here
 *    DINEPLAN_API_URL=https://api.dineplan.com (or your DinePlan instance URL)
 * 3. Update the fetchReservations function below with the correct API endpoint
 */

import { Reservation } from '@/types'

interface DinePlanReservation {
  // Adjust these fields based on your actual DinePlan API response structure
  id: string
  guestName: string
  partySize: number
  reservationTime: string
  tableNumber?: string
  notes?: string
  specialRequests?: string
}

/**
 * Fetches reservations from DinePlan API for a specific date
 * 
 * @param date - ISO date string (YYYY-MM-DD)
 * @returns Array of Reservation objects
 */
export async function fetchDinePlanReservations(
  date: string
): Promise<Reservation[]> {
  const apiKey = process.env.DINEPLAN_API_KEY
  const apiUrl = process.env.DINEPLAN_API_URL || 'https://api.dineplan.com'

  if (!apiKey) {
    console.warn('DinePlan API key not configured. Using mock data.')
    return []
  }

  try {
    // TODO: Replace this endpoint with your actual DinePlan API endpoint
    // Common patterns:
    // - GET /api/reservations?date={date}
    // - GET /api/bookings?date={date}
    // - GET /api/v1/reservations?date={date}
    const response = await fetch(`${apiUrl}/api/reservations?date=${date}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // Add cache revalidation if needed
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`DinePlan API error: ${response.statusText}`)
    }

    const dinePlanData: DinePlanReservation[] = await response.json()

    // Transform DinePlan data to our Reservation format
    return dinePlanData.map((dpReservation) => ({
      id: dpReservation.id,
      guestName: dpReservation.guestName,
      partySize: dpReservation.partySize,
      time: formatReservationTime(dpReservation.reservationTime),
      tableNumber: typeof dpReservation.tableNumber === 'number' 
        ? dpReservation.tableNumber 
        : parseInt(String(dpReservation.tableNumber || '0'), 10) || 0,
      section: 'MDA' as const, // Default to MDA, adjust based on DinePlan data
      notes: dpReservation.notes,
      specialRequests: dpReservation.specialRequests,
    }))
  } catch (error) {
    console.error('Error fetching DinePlan reservations:', error)
    // Return empty array on error - you might want to handle this differently
    return []
  }
}

/**
 * Formats a reservation time string to a readable format
 * 
 * @param timeString - Time string from DinePlan (could be ISO string, HH:MM, etc.)
 * @returns Formatted time string (e.g., "6:00 PM")
 */
function formatReservationTime(timeString: string): string {
  try {
    const date = new Date(timeString)
    if (isNaN(date.getTime())) {
      // If it's not a valid date, try parsing as HH:MM
      return timeString
    }
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return timeString
  }
}

/**
 * Example: How to use this in your API route
 * 
 * In app/api/briefing/route.ts:
 * 
 * import { fetchDinePlanReservations } from '@/lib/dineplan'
 * 
 * export async function GET() {
 *   const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
 *   const reservations = await fetchDinePlanReservations(today)
 *   
 *   // Use reservations in your briefing data
 *   return NextResponse.json({
 *     ...briefingData,
 *     reservations,
 *   })
 * }
 */

