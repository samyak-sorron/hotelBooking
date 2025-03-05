import express from "express"

import { loginUser, registerUser } from "../controllers/auth.js";

const router=express.Router();

router.get("/",(req,res)=>res.send("Hello from route/auth"))

const app = express();
app.use("/register",registerUser)
app.use("/login",loginUser)

export default router