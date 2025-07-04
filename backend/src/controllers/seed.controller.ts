import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import roomingListsData from '../../seed/roomingLists.json';
import bookingsData from '../../seed/bookings.json';

const prisma = new PrismaClient();

export const resetAndSeed = async (_req: Request, res: Response) => {
  try {
    await prisma.booking.deleteMany();
    await prisma.roomingList.deleteMany();

    const createdRoomingLists = await prisma.roomingList.createMany({
      data: roomingListsData,
    });
    const createdBookings = await prisma.booking.createMany({
      data: bookingsData,
    });

    res.status(200).json({
      message: 'Seeding completo',
      roomingLists: createdRoomingLists,
      bookings: createdBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during seeding' });
  }
};
