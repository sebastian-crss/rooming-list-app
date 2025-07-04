import { Request, RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const booking = await prisma.booking.findUnique({ where: { bookingId: id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booking' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await prisma.booking.create({ data: req.body });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const booking = await prisma.booking.update({
      where: { bookingId: id },
      data: req.body,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.booking.delete({ where: { bookingId: id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
