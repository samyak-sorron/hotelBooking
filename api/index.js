import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv"

import authRoute from "./routes/auth.js"

const app = express();
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo);
        console.log("connected to db");
    } catch (err) {
        throw err;
    }
}

// Middlewares
app.use(express.json());
app.use("/api/auth",authRoute)


app.listen(8800, () => {
    console.log("connected");
    connect();    
});
