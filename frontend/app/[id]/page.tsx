'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import RoomingListForm from '../../components/RoomingListForm'
import { getRoomingListById, RoomingList } from '../../lib/api'

export default function EditRoomingListPage() {
  const { id } = useParams()
  const router = useRouter()
  const [roomingList, setRoomingList] = useState<RoomingList | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoomingList = async () => {
      if (!id) return

      try {
        const data = await getRoomingListById(Number(id))
        setRoomingList(data)
      } catch (error) {
        console.error('Error fetching rooming list:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoomingList()
  }, [id])

  const handleSubmit = () => {
    router.push('/')
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (!roomingList) return <div className="p-4 text-red-500">Rooming list not found</div>

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Rooming List</h1>
      <RoomingListForm
        initialData={roomingList}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/')} 
        onSuccess={() => router.push('/')}      
      />
    </main>
  )
}
