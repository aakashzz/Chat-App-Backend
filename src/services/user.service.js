import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/clodinary.js";
import "dotenv/config";
import JWT from "jsonwebtoken";

//accessToken
function generateAccessToken(userId, email) {
   const accessToken = JWT.sign(
      {
         id: userId,
         email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
   );

   return { accessToken };
}
//createUser Service
export const createNewUserAccount = async function (
   fullName,
   email,
   password,
   profilePicture
) {
   if (
      [fullName, email, password].some(
         (entity) => entity?.trim() === ""
      )
   ) {
      throw new ApiError(400, "Field are Required... !");
   }
   if(!profilePicture)throw new ApiError(400,"Image Not Here")
   const existedUser = await User.findOne({ email });

   if (existedUser)
      throw new ApiError(400, "User Account Previously Created..");

   const {uploadedObject} = await uploadOnCloudinary(profilePicture);

   const newUserCreated = await User.create({
      fullName,
      email,
      password,
      profilePicture: uploadedObject.secure_url,
   });
   return newUserCreated;
};
//loginUser service
export async function loginUserAccount(email, password) {
   if ([email, password].some((entity) => entity?.trim() === "")) {
      throw new ApiError(400, "Field are Required... !");
   }
   const existedUser = await User.findOne( {email:email});

   if (!existedUser)
      throw new ApiError(400, "User Not Existed Please create Account");

   const isPasswordChecked = await existedUser.IsPasswordCorrect(password);

   if (!isPasswordChecked) throw new ApiError(400, "Password Incorrect");

   const { accessToken } = generateAccessToken(
      existedUser._id,
      existedUser.email
   );
   console.log(accessToken)
   existedUser.accessToken = accessToken;
   await existedUser.save();
   return { accessToken, existedUser };
}
//logout service
export async function logoutUserAccount(userId) {
   if(!userId) throw new ApiError(400,"User id Not Here");

   const removeTokenDB = await User.findByIdAndUpdate(userId,{
      $unset:{
         accessToken:1,
      }
   })
   return removeTokenDB
}