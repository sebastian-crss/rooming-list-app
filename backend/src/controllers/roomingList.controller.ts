import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getAllRoomingLists = async (_req: Request, res: Response) => {
  try {
    console.log('Fetching all rooming lists...')
    const roomingLists = await prisma.roomingList.findMany()
    console.log(roomingLists)
    res.json(roomingLists)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving rooming lists' })
  }
}

export const getRoomingListById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    const roomingList = await prisma.roomingList.findUnique({
      where: { roomingListId: id },
      include: { bookings: true },
    })

    if (!roomingList) {
      return res.status(404).json({ message: 'Rooming list not found' })
    }

    res.json(roomingList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving rooming list' })
  }
}

export const createRoomingList = async (req: Request, res: Response) => {
  const data = req.body

  try {
    const newRoomingList = await prisma.roomingList.create({
      data,
    })

    res.status(201).json(newRoomingList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating rooming list' })
  }
}

export const updateRoomingList = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    const updated = await prisma.roomingList.update({
      where: { roomingListId: id },
      data,
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating rooming list' });
  }
};

export const deleteRoomingList = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.roomingList.delete({
      where: { roomingListId: id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting rooming list' });
  }
};

