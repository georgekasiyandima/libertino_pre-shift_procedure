import { ServiceReminder } from '@/types'

interface ServiceRemindersProps {
  reminders: ServiceReminder[]
}

const priorityColors = {
  high: 'bg-red-100 border-red-500 text-red-900',
  medium: 'bg-yellow-100 border-yellow-500 text-yellow-900',
  low: 'bg-blue-100 border-blue-500 text-blue-900',
}

const priorityLabels = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
}

export default function ServiceReminders({ reminders }: ServiceRemindersProps) {
  if (reminders.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📋</span>
          Service Reminders
        </h2>
        <p className="text-gray-500 text-sm">No reminders for today.</p>
      </section>
    )
  }

  // Sort by priority: high -> medium -> low
  const sortedReminders = [...reminders].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">📋</span>
        Service Reminders
      </h2>
      <div className="space-y-3">
        {sortedReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`rounded p-3 border-l-4 ${priorityColors[reminder.priority]}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">{reminder.title}</h3>
              <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded bg-white/50">
                {priorityLabels[reminder.priority]}
              </span>
            </div>
            <p className="text-sm mt-1">{reminder.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

