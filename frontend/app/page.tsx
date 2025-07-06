'use client'

import { useEffect, useState } from 'react'
import { getRoomingLists, RoomingList } from '../lib/api'
import RoomingListCards from '../components/RoomingListCards'
import SearchInput from '@/components/SearchInput'
import FiltersButton from '@/components/FiltersButton'

export default function Home() {
  const [roomingLists, setRoomingLists] = useState<RoomingList[]>([])
  const [loading, setLoading] = useState(true)

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
          </div>
          <RoomingListCards
            data={roomingLists}
            onViewBookings={(id) => console.log('View bookings for', id)}
          />
         </div>
      )}
    </main>
  )
}
