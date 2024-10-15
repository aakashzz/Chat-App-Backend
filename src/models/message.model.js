import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    messageContent:{
            type:String,
            required:true,
            trim:true
        },
    sendedBy:{
        type:Schema.Types.ObjectId,
        ref:"User", 
    },
    chatId:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }
},
{timestamps:true});

export const Message = model("Message",messageSchema);