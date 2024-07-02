import { receipeModel } from "../models/Receipe.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { userModel } from "../models/User.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const response=await receipeModel.find({});
       return res.json(response);
    }
    catch(err){
  return res.json({msg:err.message});
    }
});



router.post("/",verifyToken, async(req,res)=>{
  const receipe=new receipeModel(req.body);
  try{
   const response=await receipe.save();
   res.json(receipe);
  }
  catch(err){
    return res.json({msg:err.message});
  }
    
});


router.put("/", verifyToken,async(req,res)=>{
   
    try{
    const receipe=await receipeModel.findById(req.body.recipeID);
    const user=await userModel.findById(req.body.userID);
     user.savedRecipes.push(receipe);
     await user.save()
     res.json({savedRecipes:user.savedRecipes})
    }
    catch(err){
      return res.json({msg:err.message});
    }
      
  });

  router.get("/savedRecipes/ids/:userID",async(req,res)=>{
   
    try{
        const user=await userModel.findById(req.params.userID);
    
        res.json({savedRecipes:user?.savedRecipes});
    }
    catch(err){
      return res.json({msg:err.message});
    }
      
  });

  router.get("/savedRecipes/:userID",async(req,res)=>{
   
    try{
        const user=await userModel.findById(req.params.userID);
        const savedRecipes=await receipeModel.find({
            _id:{$in:user.savedRecipes},
        })
        res.json({savedRecipes});
    }
    catch(err){
      return res.json({msg:err.message});
    }
      
  });


export {router as receipeRouter};