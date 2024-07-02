import mongoose from "mongoose"


const UserSchema=new mongoose.Schema({
    username:{type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true
    },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
})

export const userModel =mongoose.model("users",UserSchema);