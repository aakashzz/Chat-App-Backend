import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    ContactUser:{
        type:Schema.Types.ObjectId,
        ref:"Contact"
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