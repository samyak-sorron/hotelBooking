import express, { Router } from "express"

const router=express.Router();

router.get("/",(req,res)=>res.send("Hello from route/auth"))

const app = express();
app.use("/register",)
app.use("/login",)

export default router