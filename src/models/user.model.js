import {Schema,model} from 'mongoose'

const userSchema = new Schema({
    fullName:{
        type:String,
        required: true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    profilePicture:{
        type:String,
        required:true,
    }
},{timestamps:true});

export const User = model("User",userSchema)
