import { API_ENDPOINTS, RoomingList, Booking } from './types'

//#region Rooming List API Functions

export async function getRoomingLists(): Promise<RoomingList[]> {
  const res = await fetch(API_ENDPOINTS.roomingLists, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Error fetching rooming lists')
  return res.json()
}

export async function getRoomingListById(id: number): Promise<RoomingList> {
  const res = await fetch(`${API_ENDPOINTS.roomingLists}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Error fetching rooming list by ID')
  return res.json()
}

export async function createRoomingList(data: Omit<RoomingList, 'roomingListId' | 'createdAt' | 'updatedAt'>) {
  const res = await fetch(API_ENDPOINTS.roomingLists, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error creating rooming list')
  return res.json()
}

export async function updateRoomingList(id: number, data: Partial<RoomingList>) {
  const res = await fetch(`${API_ENDPOINTS.roomingLists}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error updating rooming list')
  return res.json()
}

export async function deleteRoomingList(id: number) {
  const res = await fetch(`${API_ENDPOINTS.roomingLists}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
  })
  if (!res.ok) throw new Error('Error deleting rooming list')
  return res.json()
}

//#endregion

//#region Bookings API
export async function getBookings(): Promise<Booking[]> {
  const res = await fetch(API_ENDPOINTS.bookings, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  })
  if (!res.ok) throw new Error('Error fetching bookings')
  return res.json()
}

export async function getBookingById(id: number): Promise<Booking> {
  const res = await fetch(`${API_ENDPOINTS.bookings}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  })
  if (!res.ok) throw new Error('Error fetching booking by ID')
  return res.json()
}

export async function createBooking(data: Omit<Booking, 'bookingId' | 'createdAt' | 'updatedAt'>) {
  const res = await fetch(API_ENDPOINTS.bookings, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error creating booking')
  return res.json()
}

export async function updateBooking(id: number, data: Partial<Booking>) {
  const res = await fetch(`${API_ENDPOINTS.bookings}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error updating booking')
  return res.json()
}

export async function deleteBooking(id: number) {
  const res = await fetch(`${API_ENDPOINTS.bookings}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  })
  if (!res.ok) throw new Error('Error deleting booking')
  return res.json()
}

//#endregion
