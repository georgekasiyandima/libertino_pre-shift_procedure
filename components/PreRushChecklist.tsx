'use client'

import type { PreRushChecklist } from '@/types'
import { useState } from 'react'

interface PreRushChecklistProps {
  checklist: PreRushChecklist[]
}

const categoryColors = {
  setup: 'bg-purple-50 border-purple-200 text-purple-800',
  communication: 'bg-blue-50 border-blue-200 text-blue-800',
  preparation: 'bg-green-50 border-green-200 text-green-800',
  equipment: 'bg-orange-50 border-orange-200 text-orange-800',
}

const categoryIcons = {
  setup: '🪑',
  communication: '📢',
  preparation: '🍽️',
  equipment: '🔧',
}

export default function PreRushChecklist({ checklist }: PreRushChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    new Set(checklist.filter((item) => item.completed).map((item) => item.id))
  )

  if (!checklist || checklist.length === 0) {
    return null
  }

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const groupedByCategory = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PreRushChecklist[]>)

  const completedCount = checkedItems.size
  const totalCount = checklist.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-indigo-500">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">✅</span>
          Pre-Rush Preparation Checklist
        </h2>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">
            {completedCount}/{totalCount} Complete
          </div>
          <div className="text-xs text-gray-500">{completionPercentage}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              completionPercentage === 100
                ? 'bg-green-600'
                : completionPercentage >= 75
                ? 'bg-yellow-600'
                : 'bg-blue-600'
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {(Object.keys(groupedByCategory) as Array<keyof typeof categoryColors>).map(
          (category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-2">{categoryIcons[category]}</span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="space-y-2">
                {groupedByCategory[category].map((item) => {
                  const isChecked = checkedItems.has(item.id)
                  
                  return (
                    <label
                      key={item.id}
                      className={`
                        flex items-start p-2 rounded cursor-pointer transition-all
                        ${categoryColors[category]}
                        ${isChecked ? 'opacity-60 line-through' : 'hover:bg-opacity-80'}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(item.id)}
                        className="mt-1 mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm flex-1">{item.item}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        )}
      </div>

      {completionPercentage === 100 && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-sm font-semibold text-green-800 text-center">
            🎉 All pre-rush tasks completed! Ready for service.
          </p>
        </div>
      )}
    </section>
  )
}

