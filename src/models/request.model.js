import { Schema, model } from "mongoose";

const requestSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accept', 'Reject'], 
        default: 'pending' 
    },
},
{timestamps:true});

export const Request = model("Request",requestSchema);