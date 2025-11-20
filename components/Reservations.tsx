import { Reservation } from '@/types'

interface ReservationsProps {
  reservations: Reservation[]
}

export default function Reservations({ reservations }: ReservationsProps) {
  if (reservations.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📅</span>
          Reservations Summary
        </h2>
        <p className="text-gray-500 text-sm">No reservations for today.</p>
      </section>
    )
  }

  // Group reservations by time slot
  const groupedReservations = reservations.reduce((acc, reservation) => {
    const timeSlot = reservation.time
    if (!acc[timeSlot]) {
      acc[timeSlot] = []
    }
    acc[timeSlot].push(reservation)
    return acc
  }, {} as Record<string, Reservation[]>)

  const sortedTimeSlots = Object.keys(groupedReservations).sort()

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">📅</span>
        Reservations Summary
        <span className="ml-auto text-sm font-normal text-gray-500">
          ({reservations.length} total)
        </span>
      </h2>
      <div className="space-y-4">
        {sortedTimeSlots.map((timeSlot) => (
          <div key={timeSlot} className="border-l-4 border-blue-500 pl-3">
            <h3 className="font-semibold text-blue-900 mb-2">{timeSlot}</h3>
            <div className="space-y-2">
              {groupedReservations[timeSlot].map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-blue-50 rounded p-2 text-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {reservation.guestName}
                      </p>
                      <p className="text-gray-600">
                        Party of {reservation.partySize}
                        {` • Table ${reservation.tableNumber} (${reservation.section})`}
                      </p>
                      {reservation.specialRequests && (
                        <p className="text-blue-700 mt-1 italic">
                          ⭐ {reservation.specialRequests}
                        </p>
                      )}
                      {reservation.notes && (
                        <p className="text-gray-600 mt-1">{reservation.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

