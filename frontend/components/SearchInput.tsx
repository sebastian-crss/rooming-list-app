'use client'
import { Search } from 'lucide-react'
import { useRoomingLists } from '../context/RoomingListContext'

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useRoomingLists()

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-xl h-10 px-3 shadow-sm w-full max-w-xs">
      <Search className="w-4 h-4 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search by event, RFP, or agreement type"
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
