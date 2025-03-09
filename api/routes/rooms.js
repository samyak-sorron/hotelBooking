import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/rooms.js';

const router = express.Router();


router.post('/',createRoom);
router.put('/:id',updateRoom);
router.delete('/:id/:hotelId',deleteRoom);
router.get('/:id',getRoom);
router.get('/',getRooms);


export default router;