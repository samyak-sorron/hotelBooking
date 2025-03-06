import express from 'express';

const router = express.Router();


router.post('/',createHotel);
router.put('/:id',updateHotel);
router.delete('/:id',deleteHotel);
router.get('/:id',getHotel);
router.get('/',getHotels);


export default router;