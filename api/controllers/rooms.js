import Rooms from "../models/room.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(201).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedRoom) {
      next(createError(404, "Room not found"));
    } else {
      res.status(200).json({ message: "Room updated successfully", data: updatedRoom });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      if(!hotelId){
        next(createError(404, "Hotel not found"));
      }
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id).populate("hotel").exec();
    if (!room) {
      next(createError(404, "Room not found"));
    } else {
      res.status(200).json({ message: "Room found", data: room });
    }
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find().exec();
    if (!rooms || rooms.length === 0) {
      next(createError(404, "Rooms not found"));
    } else {
      res.status(200).json({ message: "Rooms found", data: rooms });
    }
  } catch (err) {
    next(err);
  }
};
