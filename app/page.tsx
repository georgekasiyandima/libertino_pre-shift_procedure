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
import SOSMessaging from '@/components/SOSMessaging'
import FloorMessages from '@/components/FloorMessages'
import ItemLocationFinder from '@/components/ItemLocationFinder'
import SeatingArrangement from '@/components/SeatingArrangement'
import MenuViewer from '@/components/MenuViewer'
import { BriefingData } from '@/types'

export default function Home() {
  const [briefingData, setBriefingData] = useState<BriefingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    fetchBriefingData(true)
    // Refresh data every 30 seconds for real-time updates (silent refresh)
    const interval = setInterval(() => {
      fetchBriefingData(false) // Silent refresh
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchBriefingData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true)
      } else {
        setIsRefreshing(true)
      }
      
      const response = await fetch('/api/briefing', {
        cache: 'no-store', // Ensure fresh data
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch briefing data')
      }
      
      const data = await response.json()
      setBriefingData(data)
      setLastUpdate(new Date())
      setError(null) // Clear any previous errors
    } catch (err) {
      // Only show error on initial load, not on silent refreshes
      if (showLoading) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
      console.error('Error fetching briefing data:', err)
    } finally {
      if (showLoading) {
        setLoading(false)
      } else {
        setIsRefreshing(false)
      }
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
            onClick={() => fetchBriefingData(true)}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 bg-white/10 p-2 rounded-lg">
                <img
                  src="/images/liber.webp"
                  alt="Libertino Logo"
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Libertino Pre-Shift Briefing</h1>
                <p className="text-primary-100 text-sm">
                  {format(new Date(briefingData.date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isRefreshing && (
                <div className="flex items-center gap-2 text-primary-100 text-xs">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Updating...</span>
                </div>
              )}
              <a
                href="/admin"
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition text-sm"
              >
                Admin Panel
              </a>
            </div>
          </div>
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
        {briefingData.tableTurnOptimization && (
          <TableTurnOptimization optimization={briefingData.tableTurnOptimization} />
        )}
        <ServiceTimingGuidelines guidelines={briefingData.serviceTimingGuidelines || []} />

        {/* Real-Time Communication Section */}
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Real-Time Floor Communication</h2>
        </div>

        <FloorMessages messages={briefingData.floorMessages || []} />
        <SOSMessaging 
          messages={briefingData.sosMessages || []} 
          onResolve={async (id) => {
            try {
              const response = await fetch('/api/admin/sos', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
              })
              if (response.ok) {
                // Refresh data to show updated list
                fetchBriefingData(false)
              }
            } catch (error) {
              console.error('Error resolving SOS message:', error)
            }
          }}
        />
        <ItemLocationFinder items={briefingData.itemLocations || []} />

        {/* Standard Briefing Sections */}
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Briefing</h2>
        </div>

        {briefingData.currentMenu && (
          <MenuViewer menu={briefingData.currentMenu} />
        )}
        <SaladOfTheDay salad={briefingData.saladOfTheDay} />
        <DessertOfTheDay dessert={briefingData.dessertOfTheDay} />
        <MissingMenuItems items={briefingData.missingMenuItems} />
        <WaiterAllocation allocation={briefingData.waiterAllocation} />
        <SeatingArrangement
          arrangements={briefingData.seatingArrangement || []}
          reservations={briefingData.reservations}
        />
        <FloorPlan tables={briefingData.tables} />
        <Reservations reservations={briefingData.reservations} />
        {briefingData.serviceReminders && briefingData.serviceReminders.length > 0 && (
          <ServiceReminders reminders={briefingData.serviceReminders} />
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <p>Last updated: {format(lastUpdate, 'h:mm a')}</p>
            {isRefreshing && (
              <span className="inline-flex items-center">
                <svg className="animate-spin h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-1 text-primary-600">Updating...</span>
              </span>
            )}
          </div>
          <button
            onClick={() => fetchBriefingData(false)}
            className="text-primary-600 hover:text-primary-700 underline text-xs"
            disabled={isRefreshing}
          >
            Refresh Now
          </button>
        </footer>
      </div>
    </main>
  )
}

