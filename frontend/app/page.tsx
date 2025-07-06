'use client'

import { useEffect, useState } from 'react'
import { getRoomingListById, getRoomingLists } from '../lib/api'
import RoomingListCards from '../components/RoomingListCards'
import SearchInput from '@/components/SearchInput'
import FiltersButton from '@/components/FiltersButton'
import { useRoomingLists } from '../context/RoomingListContext'
import SortButton from '@/components/SortButton'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { setRoomingLists } = useRoomingLists()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRoomingLists()
        setRoomingLists(data)
      } catch (error) {
        console.error('Failed to fetch rooming lists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleViewBookings = async (roomingListId: number) => {
    try {
      console.log(roomingListId, 'Fetching bookings for this rooming list...')
      const res = await getRoomingListById(roomingListId)
      console.log('Bookings for Rooming List:', roomingListId, res.bookings)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Rooming List Management: Events</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="p-4">
          <div className="flex items-center items-start gap-4 mt-6 relative">
            <SearchInput />
            <FiltersButton />
            <SortButton />
          </div>
          <RoomingListCards
            onViewBookings={handleViewBookings}
          />
         </div>
      )}
    </main>
  )
}
