'use client'
import { SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRoomingLists } from '../context/RoomingListContext'

const FiltersButton = () => {
  const { statusFilter, setStatusFilter } = useRoomingLists()
  const [showDropdown, setShowDropdown] = useState(false)
  const [localFilters, setLocalFilters] = useState({
    Active: false,
    Closed: false,
    Cancelled: false,
  })

  // Sync localFilters with context when opened
  useEffect(() => {
    const initial = {
      Active: false,
      Closed: false,
      Cancelled: false,
    }
    statusFilter.forEach((status) => {
      initial[status as keyof typeof initial] = true
    })
    setLocalFilters(initial)
  }, [statusFilter])

  const toggleFilter = (key: keyof typeof localFilters) => {
    setLocalFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    const selectedStatuses = Object.entries(localFilters)
      .filter(([_, v]) => v)
      .map(([k]) => k)
    setStatusFilter(selectedStatuses)
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-[#f3efff] transition"
      >
        <span className="text-gray-700 mr-5">Filters</span>
        <SlidersHorizontal className="w-4 h-4 text-green-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-1">RFP STATUS</p>

          {Object.entries(localFilters).map(([status, value]) => (
            <label
              key={status}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                checked={value}
                onChange={() => toggleFilter(status as keyof typeof localFilters)}
              />
              {status}
            </label>
          ))}

          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1.5 rounded-md mt-2 transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default FiltersButton
