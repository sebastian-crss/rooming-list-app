import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import roomingListsData from '../../seed/roomingLists.json';
import bookingsData from '../../seed/bookings.json';

const prisma = new PrismaClient();

export const resetAndSeed = async (_req: Request, res: Response) => {
  try {
    await prisma.roomingListBooking.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.roomingList.deleteMany();

    const createdRoomingLists = await prisma.roomingList.createMany({
      data: roomingListsData,
    });

    const createdBookings = await prisma.booking.createMany({
      data: bookingsData,
    });

    const roomingLists = await prisma.roomingList.findMany();
    const bookings = await prisma.booking.findMany();

    const assignments = bookings.map((booking: { bookingId: string; }) => {
      const randomRoomingList =
        roomingLists[Math.floor(Math.random() * roomingLists.length)];

      return {
        roomingListId: randomRoomingList.roomingListId,
        bookingId: booking.bookingId,
      };
    });

    await prisma.roomingListBooking.createMany({
      data: assignments,
      skipDuplicates: true,
    });

    res.status(200).json({
      message: 'Seeding completo con relaciones',
      roomingListsCount: createdRoomingLists.count,
      bookingsCount: createdBookings.count,
      relationshipsCreated: assignments.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during seeding', error });
  }
};
