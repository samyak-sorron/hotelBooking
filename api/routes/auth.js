import express from "express"

import {registerUser,loginUser} from "../controllers/auth.js"


const router=express.Router();

// router.get("/",(req,res)=>res.send("Hello from route/auth"))

router.post("/register",registerUser)
router.post("/login",loginUser)

export default router