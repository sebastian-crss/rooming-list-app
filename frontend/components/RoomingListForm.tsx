import React, { useState, useEffect, FormEvent } from 'react'
import { RoomingList, createRoomingList, updateRoomingList } from '../lib/api'

interface Props {
  initialData?: RoomingList
  onSuccess: () => void
  onSubmit?: () => void
  onCancel?: () => void
}

const RoomingListForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [form, setForm] = useState({
    eventId: '',
    hotelId: '',
    rfpName: '',
    cutoffDate: '',
    status: 'Active',
    agreement_type: 'staff',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        eventId: String(initialData.eventId),
        hotelId: String(initialData.hotelId),
        rfpName: initialData.rfpName,
        cutoffDate: initialData.cutoffDate.slice(0, 10),
        status: initialData.status,
        agreement_type: initialData.agreement_type,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      eventId: Number(form.eventId),
      hotelId: Number(form.hotelId),
      rfpName: form.rfpName,
      cutoffDate: form.cutoffDate,
      status: form.status as RoomingList['status'],
      agreement_type: form.agreement_type as RoomingList['agreement_type'],
    }

    try {
      if (initialData) {
        await updateRoomingList(initialData.roomingListId, payload)
      } else {
        await createRoomingList(payload)
      }
      onSuccess()
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input type="number" name="eventId" value={form.eventId} onChange={handleChange} placeholder="Event ID" required />
      <input type="number" name="hotelId" value={form.hotelId} onChange={handleChange} placeholder="Hotel ID" required />
      <input type="text" name="rfpName" value={form.rfpName} onChange={handleChange} placeholder="RFP Name" required />
      <input type="date" name="cutoffDate" value={form.cutoffDate} onChange={handleChange} required />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Closed">Closed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select name="agreement_type" value={form.agreement_type} onChange={handleChange}>
        <option value="staff">Staff</option>
        <option value="artist">Artist</option>
        <option value="leisure">Leisure</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? 'Update' : 'Create'}
      </button>
    </form>
  )
}

export default RoomingListForm
