import express, { RequestHandler } from 'express';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/booking.controller'
import { authenticateApiKey } from '../middlewares/auth'

const router = express.Router();

router.get('/', authenticateApiKey, getAllBookings);
router.get('/:id', authenticateApiKey, getBookingById as RequestHandler);
router.post('/', authenticateApiKey, createBooking);
router.put('/:id', authenticateApiKey, updateBooking);
router.delete('/:id', authenticateApiKey, deleteBooking);

export default router;
