import { MissingMenuItem } from '@/types'

interface MissingMenuItemsProps {
  items: MissingMenuItem[]
}

export default function MissingMenuItems({ items }: MissingMenuItemsProps) {
  if (items.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">⚠️</span>
          Missing Menu Items
        </h2>
        <p className="text-gray-500 text-sm">All menu items available.</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-orange-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">⚠️</span>
        Missing Menu Items
        <span className="ml-auto text-sm font-normal text-gray-500">
          ({items.length})
        </span>
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-orange-50 rounded p-3 border border-orange-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900">{item.name}</h3>
                <p className="text-xs text-orange-700 mt-1 uppercase tracking-wide">
                  {item.category}
                </p>
                {item.reason && (
                  <p className="text-sm text-orange-600 mt-1">{item.reason}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

