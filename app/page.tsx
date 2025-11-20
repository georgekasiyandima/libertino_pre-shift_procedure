'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import SaladOfTheDay from '@/components/SaladOfTheDay'
import DessertOfTheDay from '@/components/DessertOfTheDay'
import MissingMenuItems from '@/components/MissingMenuItems'
import WaiterAllocation from '@/components/WaiterAllocation'
import FloorPlan from '@/components/FloorPlan'
import Reservations from '@/components/Reservations'
import ServiceReminders from '@/components/ServiceReminders'
import PreRushChecklist from '@/components/PreRushChecklist'
import PeakHours from '@/components/PeakHours'
import SectionCapacity from '@/components/SectionCapacity'
import ServiceTimingGuidelines from '@/components/ServiceTimingGuidelines'
import TableTurnOptimization from '@/components/TableTurnOptimization'
import { BriefingData } from '@/types'

export default function Home() {
  const [briefingData, setBriefingData] = useState<BriefingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBriefingData()
  }, [])

  const fetchBriefingData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/briefing')
      if (!response.ok) {
        throw new Error('Failed to fetch briefing data')
      }
      const data = await response.json()
      setBriefingData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching briefing data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading briefing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBriefingData}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!briefingData) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-1">Libertino Pre-Shift Briefing</h1>
          <p className="text-primary-100 text-sm">
            {format(new Date(briefingData.date), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        {/* Table Turn Optimization Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border-2 border-amber-400">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">🎯</span>
            Rush Time Optimization
          </h2>
          <p className="text-sm text-gray-700">
            Focus areas to improve table turnover and reduce bottlenecks during peak service
          </p>
        </div>

        <PreRushChecklist checklist={briefingData.preRushChecklist || []} />
        <PeakHours peakHours={briefingData.peakHours || []} />
        <SectionCapacity capacities={briefingData.sectionCapacity || []} />
        <TableTurnOptimization optimization={briefingData.tableTurnOptimization} />
        <ServiceTimingGuidelines guidelines={briefingData.serviceTimingGuidelines || []} />

        {/* Standard Briefing Sections */}
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Briefing</h2>
        </div>

        <SaladOfTheDay salad={briefingData.saladOfTheDay} />
        <DessertOfTheDay dessert={briefingData.dessertOfTheDay} />
        <MissingMenuItems items={briefingData.missingMenuItems} />
        <WaiterAllocation allocation={briefingData.waiterAllocation} />
        <FloorPlan tables={briefingData.tables} />
        <Reservations reservations={briefingData.reservations} />
        {briefingData.serviceReminders && briefingData.serviceReminders.length > 0 && (
          <ServiceReminders reminders={briefingData.serviceReminders} />
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: {format(new Date(), 'h:mm a')}</p>
        </footer>
      </div>
    </main>
  )
}

