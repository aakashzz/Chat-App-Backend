import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    ContactUserId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    Messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message"
        }
    ]
},
{timestamps:true});
    
export const Chat = model("Chat",chatSchema);