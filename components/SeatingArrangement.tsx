'use client'

import type { SeatingArrangement, Reservation } from '@/types'
import { useState } from 'react'

interface SeatingArrangementProps {
  arrangements: SeatingArrangement[]
  reservations: Reservation[]
}

const sectionConfig = {
  MDA: {
    label: 'Main Dining Area',
    tables: Array.from({ length: 12 }, (_, i) => i + 1),
    color: 'blue',
  },
  Outside: {
    label: 'Outside Section',
    tables: [21, 22, 23, 24, 25],
    color: 'green',
  },
  Library: {
    label: 'Library Area',
    tables: [61, 62, 63, 64, 65, 66],
    color: 'purple',
  },
}

export default function SeatingArrangement({
  arrangements,
  reservations,
}: SeatingArrangementProps) {
  const [selectedTime, setSelectedTime] = useState<string>('all')
  const [selectedSection, setSelectedSection] = useState<string>('all')

  // Get unique reservation times
  const reservationTimes = Array.from(
    new Set(reservations.map((r) => r.time))
  ).sort()

  // Filter arrangements based on selection
  const filteredArrangements = arrangements.filter((arr) => {
    const matchesTime =
      selectedTime === 'all' ||
      arr.reservation?.time === selectedTime ||
      (!arr.reservation && selectedTime === 'available')
    const matchesSection =
      selectedSection === 'all' || arr.section === selectedSection
    return matchesTime && matchesSection
  })

  // Group by section
  const groupedBySection = filteredArrangements.reduce((acc, arr) => {
    if (!acc[arr.section]) {
      acc[arr.section] = []
    }
    acc[arr.section].push(arr)
    return acc
  }, {} as Record<string, SeatingArrangement[]>)

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">🗺️</span>
        Seating Arrangement by Bookings
      </h2>

      {/* Filters */}
      <div className="mb-4 space-y-2">
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Filter by Time:
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Times</option>
            <option value="available">Available Tables</option>
            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Filter by Section:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3 py-1 text-xs rounded ${
                selectedSection === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              All Sections
            </button>
            {(Object.keys(sectionConfig) as Array<keyof typeof sectionConfig>).map(
              (section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-3 py-1 text-xs rounded ${
                    selectedSection === section
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {sectionConfig[section].label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Seating Arrangement Display */}
      <div className="space-y-6">
        {(Object.keys(sectionConfig) as Array<keyof typeof sectionConfig>).map(
          (sectionKey) => {
            const sectionArrangements =
              groupedBySection[sectionKey] || []
            const config = sectionConfig[sectionKey]

            if (selectedSection !== 'all' && selectedSection !== sectionKey) {
              return null
            }

            return (
              <div key={sectionKey} className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  {config.label}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {config.tables.map((tableNum) => {
                    const arrangement = sectionArrangements.find(
                      (a) => a.tableNumber === tableNum
                    )

                    if (!arrangement) {
                      return (
                        <div
                          key={tableNum}
                          className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3 text-center"
                        >
                          <div className="font-bold text-gray-600">{tableNum}</div>
                          <div className="text-xs text-gray-500 mt-1">No data</div>
                        </div>
                      )
                    }

                    const statusColors = {
                      available: 'bg-green-100 border-green-400 text-green-800',
                      reserved: 'bg-yellow-100 border-yellow-400 text-yellow-800',
                      occupied: 'bg-red-100 border-red-400 text-red-800',
                    }

                    return (
                      <div
                        key={tableNum}
                        className={`rounded-lg p-3 border-2 text-center ${statusColors[arrangement.status]}`}
                      >
                        <div className="font-bold text-lg mb-1">
                          Table {arrangement.tableNumber}
                        </div>
                        {arrangement.reservation ? (
                          <>
                            <div className="text-xs font-semibold mb-1">
                              {arrangement.reservation.guestName}
                            </div>
                            <div className="text-xs">
                              Party of {arrangement.partySize}
                            </div>
                            <div className="text-xs font-semibold mt-1">
                              {arrangement.reservation.time}
                            </div>
                            {arrangement.reservation.specialRequests && (
                              <div className="text-xs text-blue-700 mt-1 italic">
                                ⭐ {arrangement.reservation.specialRequests}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-xs">Available</div>
                        )}
                        <div className="text-xs mt-1 uppercase font-semibold">
                          {arrangement.status}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-2">Legend:</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded mr-2"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded mr-2"></span>
            <span>Reserved</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded mr-2"></span>
            <span>Occupied</span>
          </div>
        </div>
      </div>
    </section>
  )
}

