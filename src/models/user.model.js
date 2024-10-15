import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
   {
      fullName: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         trim: true,
      },
      profilePicture: {
         type: String,
      },
      accessToken: {
         type: String,
      },
   },
   { timestamps: true }
);

userSchema.pre("save", function (next) {
   if (this.isModified("password")) {
      this.password =  bcrypt.hash(this.password, 10);
      return next();
   }
   next();
});

userSchema.methods.IsPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);
