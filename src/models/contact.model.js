import { Schema, model } from "mongoose";

const contactSchema = new Schema(
   {
      contactDetails: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      userId:{
         type:Schema.Types.ObjectId,
         ref:"User",
         required:true
      }
   },
   { timestamps: true }
);

export const Contact = model("Contact", contactSchema);
