import { SectionCapacity } from '@/types'

interface SectionCapacityProps {
  capacities: SectionCapacity[]
}

const sectionLabels = {
  MDA: 'Main Dining Area',
  Outside: 'Outside Section',
  Library: 'Library Area',
}

const getCapacityColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-100 border-red-400 text-red-800'
  if (percentage >= 70) return 'bg-orange-100 border-orange-400 text-orange-800'
  if (percentage >= 50) return 'bg-yellow-100 border-yellow-400 text-yellow-800'
  return 'bg-green-100 border-green-400 text-green-800'
}

export default function SectionCapacity({ capacities }: SectionCapacityProps) {
  if (!capacities || capacities.length === 0) {
    return null
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">📊</span>
        Section Capacity Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {capacities.map((capacity) => {
          const capacityColor = getCapacityColor(capacity.capacityPercentage)
          
          return (
            <div
              key={capacity.section}
              className={`rounded-lg p-4 border-2 ${capacityColor}`}
            >
              <h3 className="font-bold text-sm uppercase tracking-wide mb-2">
                {sectionLabels[capacity.section]}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Tables:</span>
                  <span className="font-semibold">{capacity.totalTables}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available:</span>
                  <span className="font-semibold text-green-700">
                    {capacity.availableTables}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reserved:</span>
                  <span className="font-semibold text-yellow-700">
                    {capacity.reservedTables}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Occupied:</span>
                  <span className="font-semibold text-red-700">
                    {capacity.occupiedTables}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-current/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Capacity:</span>
                    <span className="font-bold text-lg">
                      {capacity.capacityPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        capacity.capacityPercentage >= 90
                          ? 'bg-red-600'
                          : capacity.capacityPercentage >= 70
                          ? 'bg-orange-600'
                          : capacity.capacityPercentage >= 50
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${capacity.capacityPercentage}%` }}
                    ></div>
                  </div>
                </div>
                {capacity.capacityPercentage >= 90 && (
                  <p className="text-xs font-semibold mt-2">
                    ⚠️ Near capacity - Focus on table turnover
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

