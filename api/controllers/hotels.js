import Hotels from "../models/Hotels.js";
import { createError } from "../utils/error.js";

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
      next(createError(404, "Hotel not found"));
    } else {
      res.status(200).json({ message: "Hotel updated successfully", data: hotel });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotels.findByIdAndDelete(req.params.id).exec();

    if (!deletedHotel) {
      next(createError(404, "Hotel not found"));
    } else {
      res.status(200).json({ message: "Hotel deleted successfully", data: deletedHotel.name });
    }
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  
  try {
    const hotel = await Hotels.findById(req.params.id).exec();
    if (!hotel) {
      next(createError(404, "Hotel not found"));
    } else {
      res.status(200).json(hotel);
    }
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const limit = parseInt(req.query.limit) || 10;

  // Set default values for min and max if they are not provided
  const minPrice = min ? parseFloat(min) : 1;
  const maxPrice = max ? parseFloat(max) : 999;

  try {
    const hotels = await Hotels.find({
      cheapestPrice: { $gte: minPrice, $lte: maxPrice },
      ...others,  // Add any other query params as filter
    }).limit(limit).exec();

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const lists = await Promise.all(cities.map(city => {
      return Hotels.countDocuments({ city: city });
    }));
    res.status(200).json(lists);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount=await Hotels.countDocuments({type:"hotel"})
    const resortCount=await Hotels.countDocuments({type:"resort"})
    const guestHouseCount=await Hotels.countDocuments({type:"guest house"})
    const villaCount=await Hotels.countDocuments({type:"villa"})
    const cabinCount=await  Hotels.countDocuments({type:"cabin"})
    res.status(200).json([
      {type:"hotel",count:hotelCount},
      {type:"resort",count:resortCount},
      {type:"guest house",count:guestHouseCount},
    ]);
  } catch (err) {
    next(err);
  }
};