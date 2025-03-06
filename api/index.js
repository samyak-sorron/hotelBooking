import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import dotenv from "dotenv"

import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"

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

mongoose.connection.on("error", (err) => {
    console.log("error", err);
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/users",authRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",authRoute)

app.use((err, req, res, next) => {
    return res.status(500).json({ message: "Internal Server Error" });
});


app.listen(8800, () => {
    console.log("connected");
    connect();    
});
