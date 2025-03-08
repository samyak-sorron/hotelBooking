
import Users from "../models/Users.js";
import { createError } from "../utils/error.js";


export const updateUser = async (req, res, next) => {
  try {
    const User = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!User) {
      next(createError(404, "User not found"));
    } else {
      res.status(200).json({ message: "User updated successfully", data: User });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id).exec();

    if (!deletedUser) {
      next(createError(404, "User not found"));
    } else {
      res.status(200).json({ message: "User deleted successfully", data: deletedUser.name });
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {  
  try {
    const User = await Users.findById(req.params.id).populate("Room").exec();
    if (!User) {
      next(createError(404, "User not found"));
    } else {
      res.status(200).json(User);
    }
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const Users = await Users.find().exec();
    if (!Users || Users.length === 0) {
      next(createError(404, "No Users found"));
    } else {
      res.status(200).json(Users);
    }
  } catch (err) {
    next(err);
  }
};