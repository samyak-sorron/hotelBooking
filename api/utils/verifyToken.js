import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403, "Token is invalid or has expired!"));
    }

    req.user = user;
    next();
  });
};

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id==req.prams.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not allowed to access this route!"))
        }
    })
};

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)    next();
        else res.status(403).send({message:'You are not allowed to access this resource'})
    })
};