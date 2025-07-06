'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RoomingList } from '@/lib/types'

interface RoomingListContextType {
  roomingLists: RoomingList[]
  setRoomingLists: (lists: RoomingList[]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
  filteredRoomingLists: RoomingList[]
  sortOrder: 'asc' | 'desc'
  setSortOrder: (order: 'asc' | 'desc') => void
  currentPage: number
  setCurrentPage: (page: number) => void
  itemsPerPage: number
}

const RoomingListContext = createContext<RoomingListContextType | undefined>(undefined)

export const RoomingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomingLists, setRoomingLists] = useState<RoomingList[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [filteredRoomingLists, setFiltered] = useState<RoomingList[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    let filtered = [...roomingLists]

    if (searchTerm.trim() !== '') {
        const lower = searchTerm.toLowerCase()
        filtered = filtered.filter(r =>
        r.rfpName.toLowerCase().includes(lower) ||
        r.agreement_type.toLowerCase().includes(lower) ||
        `event ${r.eventId}`.toLowerCase().includes(lower)
        )
    }

    if (statusFilter.length > 0) {
        filtered = filtered.filter(r => statusFilter.includes(r.status))
    }

    filtered.sort((a, b) => {
        const dateA = new Date(a.cutOffDate).getTime()
        const dateB = new Date(b.cutOffDate).getTime()
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

    setFiltered(filtered)

  }, [roomingLists, searchTerm, statusFilter, sortOrder])

  return (
    <RoomingListContext.Provider
      value={{
        roomingLists,
        setRoomingLists,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        filteredRoomingLists,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        itemsPerPage
      }}
    >
      {children}
    </RoomingListContext.Provider>
  )
}

export const useRoomingLists = () => {
  const ctx = useContext(RoomingListContext)
  if (!ctx) throw new Error('useRoomingLists must be used within a RoomingListProvider')
  return ctx
}
