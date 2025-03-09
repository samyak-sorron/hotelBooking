import { Schema, model } from 'mongoose';

const roomsSchema = new Schema({

  title: { type: String, required: true },
  price: { type: Number, required: true }, 
  description: { type: String, required: true },
  maxPeople:{
    type:Number,
    required:true
  },
  roomNumbers: [{ number:Number, unavailableDates:{type:[Date]} }],
  featured: { type: Boolean, default: false }
});

export default model('Rooms', roomsSchema);
