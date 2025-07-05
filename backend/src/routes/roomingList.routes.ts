import { RequestHandler } from 'express';
import express from 'express'
import {
  getAllRoomingLists,
  getRoomingListById,
  createRoomingList,
  updateRoomingList,
  deleteRoomingList,
} from '../controllers/roomingList.controller';
import { authenticateApiKey } from '../middlewares/auth'

const router = express.Router()

router.get('', authenticateApiKey, getAllRoomingLists)
router.get('/:id', authenticateApiKey, getRoomingListById as RequestHandler)
router.post('/', authenticateApiKey, createRoomingList)
router.put('/:id', authenticateApiKey, updateRoomingList);
router.delete('/:id', authenticateApiKey, deleteRoomingList);

export default router
