import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotels.js';

const router = express.Router();


router.post('/',createHotel);
router.post('/:id',updateHotel);
router.post('/:id',deleteHotel);
router.post('/:id',getHotel);
router.post('/',getHotels);


export default router;