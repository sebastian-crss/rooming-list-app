export interface Booking {
  bookingId: number
  hotelId: number
  eventId: number
  guestName: string
  guestPhoneNumber: string
  checkInDate : string
  checkOutDate: string
  createdAt: string
  updatedAt: string
}

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
  bookings: Booking[]
}

const API_BASE_URL = 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  roomingLists: `${API_BASE_URL}/rooming-lists`,
  bookings: `${API_BASE_URL}/bookings`,
}