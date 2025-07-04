import express, { RequestHandler } from 'express';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/booking.controller'

const router = express.Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById as RequestHandler);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
