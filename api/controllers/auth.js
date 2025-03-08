import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// Register
export const registerUser = async (req, res) => {
  
  try {
    const salt =bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    next(createError(500, "Server error"));    
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return next(createError(400, "Wrong Password"));
    }
    const token = jwt.sign({ id:user._id,isAdmin:user.isAdmin}, process.env.JWT);
    
    const { password,isAdmin, ...others } = user._doc;
    res.cookie("access_token",token,{httpOnly:true}).status(200).json({ message: "User logged in successfully", data: others });
  } catch (err) {
    next(createError(500, "Server error"));
  }
};