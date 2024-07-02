import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { useRouter } from "./routes/user.js";

import { receipeRouter } from "./routes/receipes.js";
const app=express();



app.use(express.json());
app.use(cors());
app.use("/auth",useRouter);
app.use("/recipes",receipeRouter);




const url="mongodb+srv://onkarsingh24project:dynamics123@cluster0.qq3fglz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})

app.listen(5000,()=>{
    console.log("SERVER RUNNING")
})