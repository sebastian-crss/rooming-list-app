export interface RoomingList {
  roomingListId: number
  eventId: number
  hotelId: number
  rfpName: string
  cutOffDate: string
  status: 'Active' | 'Inactive'
  agreement_type: 'staff' | 'guest'
  createdAt: string
  updatedAt: string
}

const API_URL = 'http://localhost:3001/api/rooming-lists'

export async function getRoomingLists(): Promise<RoomingList[]> {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Error fetching rooming lists')
  return res.json()
}

export async function getRoomingListById(id: number): Promise<RoomingList> {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Error fetching rooming list by ID')
  return res.json()
}

export async function createRoomingList(data: Omit<RoomingList, 'roomingListId' | 'createdAt' | 'updatedAt'>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error creating rooming list')
  return res.json()
}

export async function updateRoomingList(id: number, data: Partial<RoomingList>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error updating rooming list')
  return res.json()
}

export async function deleteRoomingList(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
  })
  if (!res.ok) throw new Error('Error deleting rooming list')
  return res.json()
}
