import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/rooms';

const router = express.Router();


router.post('/',createRoom);
router.put('/:id',updateRoom);
router.delete('/:id',deleteRoom);
router.get('/:id',getRoom);
router.get('/',getRooms);


export default router;