import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

const FiltersButton = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [filters, setFilters] = useState({
        Active: true,
        Closed: false,
        Canceled: false,
    })

    const toggleFilter = (key: keyof typeof filters) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const handleSave = () => {
    setShowDropdown(false)
    console.log('Filters applied:', filters)
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

            {['Active', 'Closed', 'Canceled'].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600"
                  checked={filters[status as keyof typeof filters]}
                  onChange={() => toggleFilter(status as keyof typeof filters)}
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
