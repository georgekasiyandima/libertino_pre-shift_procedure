'use client'

import { Table } from '@/types'
import { useState } from 'react'

interface FloorPlanProps {
  tables: Table[]
}

const sectionConfig = {
  MDA: {
    label: 'Main Dining Area',
    range: [1, 12],
    color: 'blue',
  },
  Outside: {
    label: 'Outside Section',
    range: [21, 25],
    color: 'green',
  },
  Library: {
    label: 'Library Area',
    range: [61, 66],
    color: 'purple',
  },
}

const statusColors = {
  available: 'bg-gray-200 text-gray-700 border-gray-300',
  reserved: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  occupied: 'bg-red-100 text-red-800 border-red-400',
  cleaning: 'bg-blue-100 text-blue-800 border-blue-400',
}

const statusIcons = {
  available: '✓',
  reserved: '📅',
  occupied: '👥',
  cleaning: '🧹',
}

export default function FloorPlan({ tables }: FloorPlanProps) {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  // Group tables by section
  const tablesBySection = {
    MDA: tables.filter((t) => t.section === 'MDA').sort((a, b) => a.number - b.number),
    Outside: tables.filter((t) => t.section === 'Outside').sort((a, b) => a.number - b.number),
    Library: tables.filter((t) => t.section === 'Library').sort((a, b) => a.number - b.number),
  }

  const handleTableClick = (table: Table) => {
    setSelectedTable(selectedTable?.id === table.id ? null : table)
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">🗺️</span>
        Floor Plan - Real-Time Table Status
      </h2>

      <div className="space-y-6">
        {(Object.keys(sectionConfig) as Array<keyof typeof sectionConfig>).map((sectionKey) => {
          const sectionTables = tablesBySection[sectionKey]
          const config = sectionConfig[sectionKey]

          if (sectionTables.length === 0) return null

          return (
            <div key={sectionKey} className="space-y-2">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                {config.label} (Tables {config.range[0]}-{config.range[1]})
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {sectionTables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    className={`
                      relative p-3 rounded-lg border-2 font-semibold text-sm
                      transition-all duration-200 hover:scale-105 hover:shadow-md
                      ${statusColors[table.status]}
                      ${selectedTable?.id === table.id ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                    `}
                    title={`Table ${table.number} - ${table.status}`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs opacity-75 mb-1">
                        {statusIcons[table.status]}
                      </span>
                      <span className="font-bold">{table.number}</span>
                      {table.waiterName && (
                        <span className="text-xs mt-1 opacity-75 truncate w-full">
                          {table.waiterName.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Table Status Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          Legend:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-2"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded mr-2"></span>
            <span>Reserved</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-100 border border-red-400 rounded mr-2"></span>
            <span>Occupied</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-blue-100 border border-blue-400 rounded mr-2"></span>
            <span>Cleaning</span>
          </div>
        </div>
      </div>

      {/* Table Details Modal/Info */}
      {selectedTable && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-900">Table {selectedTable.number}</h4>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Section:</span> {selectedTable.section}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="capitalize">{selectedTable.status}</span>
            </p>
            {selectedTable.waiterName && (
              <p>
                <span className="font-medium">Waiter:</span> {selectedTable.waiterName}
              </p>
            )}
            {selectedTable.reservation && (
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="font-medium">Reservation:</p>
                <p className="text-xs">{selectedTable.reservation.guestName}</p>
                <p className="text-xs">Party of {selectedTable.reservation.partySize}</p>
                <p className="text-xs">{selectedTable.reservation.time}</p>
                {selectedTable.reservation.specialRequests && (
                  <p className="text-xs text-blue-600 mt-1">
                    ⭐ {selectedTable.reservation.specialRequests}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

