import { Schema, model } from "mongoose";

const contactSchema = new Schema(
   {
      contactUserDetails: [
         {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
         },
      ],
      createdBy: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

export const Contact = model("Contact", contactSchema);
