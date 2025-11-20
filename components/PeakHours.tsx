import { PeakHour } from '@/types'

interface PeakHoursProps {
  peakHours: PeakHour[]
  currentTime?: Date
}

const intensityColors = {
  low: 'bg-green-100 border-green-400 text-green-800',
  medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  high: 'bg-orange-100 border-orange-400 text-orange-800',
  critical: 'bg-red-100 border-red-400 text-red-800',
}

const intensityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

export default function PeakHours({ peakHours, currentTime }: PeakHoursProps) {
  if (!peakHours || peakHours.length === 0) {
    return null
  }

  const now = currentTime || new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTimeMinutes = currentHour * 60 + currentMinute

  const isCurrentlyPeak = (peak: PeakHour) => {
    try {
      const [startHour, startMin] = peak.start.split(':').map(Number)
      const [endHour, endMin] = peak.end.split(':').map(Number)
      const startMinutes = startHour * 60 + startMin
      const endMinutes = endHour * 60 + endMin
      
      if (startMinutes <= endMinutes) {
        return currentTimeMinutes >= startMinutes && currentTimeMinutes <= endMinutes
      } else {
        // Handles overnight peaks (e.g., 22:00 - 02:00)
        return currentTimeMinutes >= startMinutes || currentTimeMinutes <= endMinutes
      }
    } catch {
      return false
    }
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-purple-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">⏰</span>
        Peak Hours & Expected Rush Times
      </h2>
      <div className="space-y-3">
        {peakHours.map((peak, index) => {
          const isActive = isCurrentlyPeak(peak)
          
          return (
            <div
              key={index}
              className={`
                rounded-lg p-3 border-2 transition-all
                ${intensityColors[peak.intensity]}
                ${isActive ? 'ring-2 ring-offset-2 ring-purple-400 scale-105' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">
                    {peak.start} - {peak.end}
                  </h3>
                  {isActive && (
                    <span className="text-xs font-bold uppercase tracking-wide bg-white px-2 py-1 rounded mt-1 inline-block">
                      🔴 Currently Active
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wide bg-white/70 px-2 py-1 rounded">
                    {intensityLabels[peak.intensity]}
                  </span>
                  <p className="text-xs mt-1 opacity-75">
                    ~{peak.expectedCoverCount} covers
                  </p>
                </div>
              </div>
              {peak.intensity === 'critical' && (
                <p className="text-sm font-semibold mt-2">
                  ⚠️ Maximum capacity expected - All hands on deck!
                </p>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          💡 <strong>Tip:</strong> Use peak hours to anticipate table turnover needs and coordinate breaks accordingly.
        </p>
      </div>
    </section>
  )
}

