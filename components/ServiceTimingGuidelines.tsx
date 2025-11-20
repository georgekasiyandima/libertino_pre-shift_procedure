import { ServiceTimingGuideline } from '@/types'

interface ServiceTimingGuidelinesProps {
  guidelines: ServiceTimingGuideline[]
}

export default function ServiceTimingGuidelines({
  guidelines,
}: ServiceTimingGuidelinesProps) {
  if (!guidelines || guidelines.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">⏱️</span>
        Service Timing Guidelines
        <span className="ml-auto text-sm font-normal text-gray-600">
          Target Turn Times
        </span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Follow these timing guidelines to optimize table turnover and reduce bottlenecks:
      </p>
      <div className="space-y-3">
        {guidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="bg-white rounded-lg p-3 border border-blue-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{guideline.stage}</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-2">
                {guideline.targetTime}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{guideline.description}</p>
            {guideline.tips && guideline.tips.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  💡 Quick Tips:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {guideline.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-blue-200">
        <p className="text-xs text-blue-700">
          <strong>Remember:</strong> Consistent timing creates predictable service flow and improves guest experience.
        </p>
      </div>
    </section>
  )
}

