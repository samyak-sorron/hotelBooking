import { Schema, model } from 'mongoose';

const hotelSchema = new Schema({

  title: { type: String, required: true },
  price: { type: Number, required: true }, 
  description: { type: String, required: true },
  maxPeope:{
    type:Number,
    required:true
  },
  roomNumbers: [{ number:Number, unavailableDates:{type:[Date]} }],
  featured: { type: Boolean, default: false }
});

export default model('Hotel', hotelSchema);
