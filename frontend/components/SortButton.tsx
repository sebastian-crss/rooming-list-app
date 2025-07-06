'use client'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'
import { useRoomingLists } from '../context/RoomingListContext'

const SortButton = () => {
  const { sortOrder, setSortOrder } = useRoomingLists()

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <button
      onClick={toggleSort}
      className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 text-sm font-medium shadow-sm hover:bg-[#f3efff] transition"
    >
      {sortOrder === 'asc' ? (
        <ArrowDownAZ className="w-4 h-4 text-indigo-600" />
      ) : (
        <ArrowUpAZ className="w-4 h-4 text-indigo-600" />
      )}
      Sort by Cut-Off
    </button>
  )
}

export default SortButton
