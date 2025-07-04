import { RequestHandler } from 'express';
import express from 'express'
import {
  getAllRoomingLists,
  getRoomingListById,
  createRoomingList,
  updateRoomingList,
  deleteRoomingList,
} from '../controllers/roomingList.controller';

const router = express.Router()

// GET /api/rooming-lists
router.get('', getAllRoomingLists)

// GET /api/rooming-lists/:id
router.get('/:id', getRoomingListById as RequestHandler)

// POST /api/rooming-lists
router.post('/', createRoomingList)

router.put('/:id', updateRoomingList);
router.delete('/:id', deleteRoomingList);

export default router
