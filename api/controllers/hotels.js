import Hotels from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotels(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json({ message: "Hotel created successfully", data: savedHotel });
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      res.status(200).json({ message: "Hotel updated successfully", data: hotel });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id).exec();
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }

    // await Room.deleteMany({ _id: { $in: hotel.rooms } });

    const deletedHotel = await Hotels.findByIdAndDelete(req.params.id).exec();

    if (!deletedHotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      res.status(200).json({ message: "Hotel deleted successfully", data: deletedHotel.name });
    }
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  
  try {
    const hotel = await Hotels.findById(req.params.id).populate("Room").exec();
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      console.log("here");
      res.status(200).json({ message: "Hotel found", data: hotel });
    }
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotels.find().exec();
    if (!hotels || hotels.length === 0) {
      res.status(404).json({ message: "No hotels found" });
    } else {
      res.status(200).json({ message: "Hotels found", data: hotels });
    }
  } catch (err) {
    next(err);
  }
};