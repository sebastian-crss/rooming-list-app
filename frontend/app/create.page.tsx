'use client'

import React, { useEffect, useState } from 'react'
import { RoomingList, getRoomingLists } from '../lib/api'
import RoomingListTable from '../components/RoomingListCards'

export default function Home() {
  const [data, setData] = useState<RoomingList[]>([])
  const [editing, setEditing] = useState<RoomingList | null>(null)

  const fetchRoomingLists = async () => {
    try {
      const lists = await getRoomingLists()
      setData(lists)
    } catch (err) {
      console.error('Failed to fetch:', err)
    }
  }

  useEffect(() => {
    fetchRoomingLists()
  }, [])

  const handleFormSubmit = () => {
    fetchRoomingLists()
    setEditing(null)
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rooming List Manager</h1>

      <RoomingListTable
        data={data}
      />
    </main>
  )
}
