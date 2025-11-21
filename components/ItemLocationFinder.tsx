'use client'

import { ItemLocation } from '@/types'
import { useState } from 'react'

interface ItemLocationFinderProps {
  items: ItemLocation[]
}

const sectionColors = {
  MDA: 'bg-blue-50 border-blue-300 text-blue-800',
  Outside: 'bg-green-50 border-green-300 text-green-800',
  Library: 'bg-purple-50 border-purple-300 text-purple-800',
  Kitchen: 'bg-orange-50 border-orange-300 text-orange-800',
  Storage: 'bg-gray-50 border-gray-300 text-gray-800',
}

export default function ItemLocationFinder({ items }: ItemLocationFinderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSection, setSelectedSection] = useState<string>('all')

  if (!items || items.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📍</span>
          Item Location Finder
        </h2>
        <p className="text-gray-500 text-sm">No items registered.</p>
      </section>
    )
  }

  const sections = Array.from(new Set(items.map((item) => item.section || 'Other')))
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSection =
      selectedSection === 'all' || item.section === selectedSection
    return matchesSearch && matchesSection
  })

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">📍</span>
        Item Location Finder
      </h2>

      {/* Search and Filter */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search items (e.g., napkins, candles)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
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
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-3 py-1 text-xs rounded ${
                selectedSection === section
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No items found matching your search.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg p-3 border-2 ${
                sectionColors[item.section || 'Storage']
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{item.item}</h3>
                  <p className="text-xs mb-1">
                    <span className="font-semibold">Location:</span> {item.location}
                  </p>
                  {item.section && (
                    <p className="text-xs mb-1">
                      <span className="font-semibold">Section:</span> {item.section}
                    </p>
                  )}
                  {item.quantity && (
                    <p className="text-xs mb-1">
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-xs italic mt-1">{item.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}


