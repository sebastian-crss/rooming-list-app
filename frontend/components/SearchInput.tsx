import { Search } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-xl h-10 px-3 shadow-sm w-full max-w-xs">
      <Search className="w-4 h-4 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
      />
    </div>
  )
}

export default SearchInput
