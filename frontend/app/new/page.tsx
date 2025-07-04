'use client'

import { useRouter } from 'next/navigation'
import RoomingListForm from '../../components/RoomingListForm'

export default function NewRoomingListPage() {
  const router = useRouter()

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Rooming List</h1>
      {/* <RoomingListForm
        onSubmit={() => router.push('/')}
        onCancel={() => router.push('/')}
      /> */}
    </main>
  )
}
