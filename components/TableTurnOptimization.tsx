import type { TableTurnOptimization } from '@/types'

interface TableTurnOptimizationProps {
  optimization: TableTurnOptimization
}

export default function TableTurnOptimization({
  optimization,
}: TableTurnOptimizationProps) {
  if (!optimization) {
    return null
  }

  const isOnTarget =
    parseFloat(optimization.averageTurnTime.replace(/[^0-9.]/g, '')) <=
    parseFloat(optimization.targetTurnTime.replace(/[^0-9.]/g, ''))

  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-4 mb-4 border-l-4 border-amber-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">🚀</span>
        Table Turn Optimization
      </h2>

      {/* Turn Time Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 border border-amber-200">
          <p className="text-xs text-gray-600 mb-1">Current Average</p>
          <p className="text-2xl font-bold text-gray-900">
            {optimization.averageTurnTime}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-amber-200">
          <p className="text-xs text-gray-600 mb-1">Target Turn Time</p>
          <p className="text-2xl font-bold text-amber-700">
            {optimization.targetTurnTime}
          </p>
        </div>
      </div>

      {/* Status Indicator */}
      <div
        className={`mb-4 p-3 rounded-lg border-2 ${
          isOnTarget
            ? 'bg-green-100 border-green-400 text-green-800'
            : 'bg-red-100 border-red-400 text-red-800'
        }`}
      >
        <p className="font-semibold text-center">
          {isOnTarget ? (
            <>✅ Meeting target turn time - Great work!</>
          ) : (
            <>⚠️ Above target - Focus on optimization tips below</>
          )}
        </p>
      </div>

      {/* Optimization Tips */}
      {optimization.tips && optimization.tips.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Optimization Tips
          </h3>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <ul className="space-y-2">
              {optimization.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="mr-2 text-amber-600">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bottlenecks */}
      {optimization.bottlenecks && optimization.bottlenecks.length > 0 && (
        <div>
          <h3 className="font-semibold text-red-800 mb-2 flex items-center">
            <span className="mr-2">⚠️</span>
            Current Bottlenecks
          </h3>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <ul className="space-y-2">
              {optimization.bottlenecks.map((bottleneck, index) => (
                <li key={index} className="flex items-start text-sm text-red-800">
                  <span className="mr-2">🔴</span>
                  <span>{bottleneck}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}

