import React from 'react'
import { RoomingList } from '../lib/api'
import { Calendar } from 'lucide-react'

interface Props {
  data: RoomingList[]
  onViewBookings?: (roomingListId: number) => void
}

const RoomingListCards: React.FC<Props> = ({ data, onViewBookings }) => {
  const grouped = data.reduce((acc: any, item) => {
    const key = item.eventId
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-8 mt-6">
      {Object.entries(grouped).map(([eventId, lists]) => (
        <div key={eventId}>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
              Event {eventId}
            </span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(lists as RoomingList[]).map((r) => (
              <div
                key={r.roomingListId}
                className="min-w-[280px] rounded border shadow p-4 relative bg-white"
              >
                <div className="absolute top-2 right-2 flex flex-col items-center space-y-0.5">
                  <div className="rounded-lg overflow-hidden shadow-sm bg-blue-100">
                    <div className="text-[10px] font-semibold text-blue-600 bg-blue-200 text-center px-2 py-0.5">
                      {new Date(r.cutOffDate).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-lg font-extrabold text-blue-600 bg-blue-100 text-center px-2 py-0.5">
                      {new Date(r.cutOffDate).getDate()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-1">Cut-Off Date</div>
                </div>

                <div className="mb-2">
                  <p className="text-sm font-semibold pr-15 font-semibold">{r.rfpName}</p>
                  <p className="text-sm">Agreement: <span className='font-bold'>{r.agreement_type}</span></p>
                </div>

                <div className="text-sm text-gray-600 mb-2 flex gap-2 font-semibold">
                   <Calendar className="w-4 h-4 text-gray-400" />
                   <span>
                    {new Date(r.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })} -  {' '}
                    {new Date(r.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 bg-[#5F22F5] hover:bg-[#4e1cd1] text-white font-semibold py-2 rounded-md shadow-md transition"
                  >
                    View Bookings (34)
                  </button>

                  <button
                    className="p-2 border-2 border-[#5F22F5] rounded-md flex items-center justify-center hover:bg-[#f3efff] transition"
                    title="View Agreement"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[#5F22F5]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomingListCards
