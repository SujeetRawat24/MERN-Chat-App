import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

import User from '../models/user.model.js';


export const signup = async (req,res,next) => {
   try {
     const {fullName,email, password} = req.body

     if(!fullName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
     }
    if(password.length < 6){
        return res.status(400).json({message: "password must be at least 6 characters"});
    }

    // Check if user already exists
     const user = await User.findOne({email});
     if(user) return res.status(400).json({message: 'User already exists'});

    //Hash Passsword
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

    // Create new user
     const newUser = new User ({
        fullName,
        email,
        password:hashedPassword
     })

     // Save user and generate token
     if(newUser) {
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({ mesasge: "User created sucessfully", data: {
               id: newUser._id,
               fullname: newUser.fullname,
               email: newUser.email
            }})
     }
     else res.status(400).json({message: "Invalid user data"});

   } catch (error) {
    next(error);
   }
}

export const login = async (req,res) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({ email });

        if(!user) return res.status(400).json({message: "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"});

         generateToken(user._id, res); // Call generateToken function
            res.status(200).json({ message: "User logged in successfully", data: {
               id: user._id,
               fullname: user.fullname,
               email: user.email
            } });

   } catch (error) {
       console.error("Error in login controller:", error);
        next(error); // Pass the error to the error handling middleware
   }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" })  //Clear the cookie
        res.status(200).json({ message: "User logged out successfully" });
   }catch(error){
       console.error("Error in logout controller:", error);
        next(error); // Pass the error to the error handling middleware
   }
}