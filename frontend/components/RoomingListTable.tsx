import React from 'react'
import { RoomingList, deleteRoomingList } from '../lib/api'

interface Props {
  data: RoomingList[]
  onEdit: (roomingList: RoomingList) => void
  onDeleteComplete: () => void
}

const RoomingListTable: React.FC<Props> = ({ data, onEdit, onDeleteComplete }) => {
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this rooming list?')) {
      try {
        await deleteRoomingList(id)
        onDeleteComplete()
      } catch (err) {
        console.error('Failed to delete:', err)
      }
    }
  }

  return (
    <table className="min-w-full border mt-4">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">RFP Name</th>
          <th className="p-2">Event ID</th>
          <th className="p-2">Hotel ID</th>
          <th className="p-2">Cutoff</th>
          <th className="p-2">Status</th>
          <th className="p-2">Agreement</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.roomingListId} className="border-t">
            <td className="p-2">{r.rfpName}</td>
            <td className="p-2">{r.eventId}</td>
            <td className="p-2">{r.hotelId}</td>
            <td className="p-2">{new Date(r.cutoffDate).toLocaleDateString()}</td>
            <td className="p-2">{r.status}</td>
            <td className="p-2">{r.agreement_type}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => onEdit(r)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.roomingListId)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RoomingListTable
