import type { WaiterAllocation } from '@/types'

interface WaiterAllocationProps {
  allocation: WaiterAllocation
}

const sectionLabels: Record<keyof WaiterAllocation, string> = {
  mda: 'Main Dining Area (Tables 1-12)',
  outside: 'Outside Section (Tables 21-25)',
  library: 'Library Area (Tables 61-66)',
}

const sectionColors: Record<keyof WaiterAllocation, string> = {
  mda: 'bg-blue-50 border-blue-500 text-blue-900',
  outside: 'bg-green-50 border-green-500 text-green-900',
  library: 'bg-purple-50 border-purple-500 text-purple-900',
}

export default function WaiterAllocation({ allocation }: WaiterAllocationProps) {
  const sections: Array<{ key: keyof WaiterAllocation; waiters: typeof allocation.mda }> = [
    { key: 'mda', waiters: allocation.mda },
    { key: 'outside', waiters: allocation.outside },
    { key: 'library', waiters: allocation.library },
  ]

  const totalWaiters = allocation.mda.length + allocation.outside.length + allocation.library.length

  if (totalWaiters === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">👥</span>
          Waiter Allocation
        </h2>
        <p className="text-gray-500 text-sm">No waiter allocation posted.</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">👥</span>
        Waiter Allocation
      </h2>
      <div className="space-y-4">
        {sections.map(({ key, waiters }) => {
          if (waiters.length === 0) return null

          return (
            <div
              key={key}
              className={`rounded-lg p-3 border-l-4 ${sectionColors[key]}`}
            >
              <h3 className="font-bold text-sm uppercase tracking-wide mb-2">
                {sectionLabels[key]}
              </h3>
              <div className="space-y-2">
                {waiters.map((waiter) => (
                  <div
                    key={waiter.id}
                    className="bg-white/70 rounded p-2 text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{waiter.name}</span>
                      <span className="text-xs bg-white px-2 py-1 rounded">
                        Tables: {waiter.tables.sort((a, b) => a - b).join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

