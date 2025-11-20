import { SaladOfTheDay as SaladOfTheDayType } from '@/types'

interface SaladOfTheDayProps {
  salad: SaladOfTheDayType | null
}

export default function SaladOfTheDay({ salad }: SaladOfTheDayProps) {
  if (!salad) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🥗</span>
          Salad of the Day
        </h2>
        <p className="text-gray-500 text-sm">No salad posted for today.</p>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-4 mb-4 border-l-4 border-green-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">🥗</span>
        Salad of the Day
      </h2>
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-gray-900">{salad.name}</h3>
        <p className="text-sm text-gray-700">{salad.description}</p>
        {salad.ingredients && salad.ingredients.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Ingredients:
            </p>
            <div className="flex flex-wrap gap-2">
              {salad.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
        {salad.price && (
          <p className="font-semibold text-green-700 mt-2">{salad.price}</p>
        )}
      </div>
    </section>
  )
}

