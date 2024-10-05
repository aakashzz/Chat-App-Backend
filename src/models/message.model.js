import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    messageItem:{
            type:String,
            required:true,
            trim:true
        },
    sendedBy:{
        type:String,
        ref:"User",
        required:true,
    }
},
{timestamps:true});

export const Message = model("Message",messageSchema);