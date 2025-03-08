import Room from "../models/Room";


export const createRoom = async (req, res, next) => {
  const hotelId=req.prams.hotelid;
  const newRoom=new Room(req.body);
  try {
    const savedRoom=await newRoom.save();
    try{
      await hotelId.findByIdAndUpdate(hotelId,{
        $push:{rooms:savedRoom._id},
      });

    }catch(err){
      next(err);
    }
    res.status(200),json(savedRoom);
    } catch (err) {
      next(err);
    }
};

export const updateRoom = async (req, res, next) => {
  try {
    const Room = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, { new: true });
    if (!Room) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json({ message: "Room updated successfully", data: Room });
    }
  } catch (err) {
    next(err); 
  }
};

export const deleteRoom = async (req, res, next) => {
  try {

    const deletedRoom = await Room.findByIdAndDelete(req.params.id).exec();

    if (!deletedRoom) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json({ message: "Room deleted successfully", data: deletedRoom.name });
    }
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  
  try {
    const Room = await Room.findById(req.params.id).populate("Room").exec();
    if (!Room) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json({ message: "Room found", data: Room });
    }
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find().exec();
    if (!Rooms || Rooms.length === 0) {
      res.status(404).json({ message: "No Rooms found" });
    } else {
      res.status(200).json({ message: "Rooms found", data: Rooms });
    }
  } catch (err) {
    next(err);
  }
};