import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const authorize = async (req,res,next) => {

   try {
    const token = req.cookies.jwt;

    if(!token) return res.status(400).json({message: " Unauthorized :No token provided"});

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded) return res.status(400).json({message: " Unauthorized : Invalid token"});

    const user = await User.findById(decoded.userId).select("-password");

    if(!user)  return res.status(404).json({message: " Unauthorized : User Not found"});

    req.user = user;
    
    next();
    
   } catch (error) {
    console.log("Error in authorize middleware", error.message);
    next(err);
   }

}