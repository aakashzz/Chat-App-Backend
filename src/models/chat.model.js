import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message",
            required:true,
        }
    ],
    createdBY:{
        type:String,
        ref:"User",
        required:true,
    }
},
{timestamps:true});

export const Chat = model("Chat",chatSchema);