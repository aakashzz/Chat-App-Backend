import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    userDetails:
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    
},
{timestamps:true});

export const Contact = model("Contact",contactSchema);