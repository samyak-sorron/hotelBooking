import { Schema, model } from 'mongoose';

const hotelSchema = new Schema({
  rating: { type: Number , min: 1, max: 5, required: true }, 

  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true }, 
  description: { type: String, required: true },
  photos: [{ type: String }],
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }] ,
  chepestPrice: { type: Number, required: true },
  featured: { type: Boolean, default: false }
});

export default model('Hotel', hotelSchema);
