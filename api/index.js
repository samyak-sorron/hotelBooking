import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import cors from "cors";


import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import userRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"

const app = express();  
// app.use(cors({ origin: 'http://localhost:3000' }));

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
app.use("/api/users",userRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
});


app.listen(8800, () => {
    console.log("connected");
    connect();    
});
