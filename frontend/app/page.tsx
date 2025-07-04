'use client'

import { useEffect, useState } from 'react'
import { getRoomingLists, RoomingList } from '../lib/api'
import RoomingListTable from '../components/RoomingListTable'

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
      <h1 className="text-3xl font-bold mb-6">Rooming Lists</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <RoomingListTable data={roomingLists} onEdit={(rooming) => console.log(rooming)} onDeleteComplete={function (): void {
            throw new Error('Function not implemented.')
          } }     />
      )}
    </main>
  )
}
