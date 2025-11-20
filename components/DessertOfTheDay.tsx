import { DessertOfTheDay as DessertOfTheDayType } from '@/types'

interface DessertOfTheDayProps {
  dessert: DessertOfTheDayType | null
}

export default function DessertOfTheDay({ dessert }: DessertOfTheDayProps) {
  if (!dessert) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🍰</span>
          Dessert of the Day
        </h2>
        <p className="text-gray-500 text-sm">No dessert posted for today.</p>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg shadow-md p-4 mb-4 border-l-4 border-pink-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">🍰</span>
        Dessert of the Day
      </h2>
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-gray-900">{dessert.name}</h3>
        <p className="text-sm text-gray-700">{dessert.description}</p>
        {dessert.price && (
          <p className="font-semibold text-pink-700 mt-2">{dessert.price}</p>
        )}
      </div>
    </section>
  )
}

