import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    messageContent:{
            type:String,
            required:true,
            trim:true
        },
    sendedBy:{
        type:String,
        ref:"User",
        required:true,
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }
},
{timestamps:true});

export const Message = model("Message",messageSchema);