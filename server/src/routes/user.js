import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { userModel } from "../models/User.js";


const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (user) return res.json({ msg: "User already exists" });

        const hashpass = await bcrypt.hash(password, 10); // Correctly await bcrypt hashing
        const newuser = new userModel({
            username,
            password: hashpass // Store the hashed password
        });
        
        await newuser.save();
        res.json({ msg: "User created" });
        res.json({msg:"running"})
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.post("/login",async(req,res)=>{

    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) return res.json({ msg: "User does't exist" });

         const isMatching=await bcrypt.compare(password,user.password);
         if(!isMatching)return res.json({msg:"wrong password"});

         const token=jwt.sign({id:user._id},"SECRET");

        
        res.json({token:token,
            userID:user._id
        })
        }
       catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

export { router as useRouter };




export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "SECRET", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };