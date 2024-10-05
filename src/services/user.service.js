import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/clodinary.js";
import "dotenv/config";

//createUser Service
export const createNewUserAccount = async function (
   fullName,
   email,
   password,
   profilePicture
) {
   if (
      [fullName, email, password, profilePicture].some(
         (entity) => entity?.trim() === ""
      )
   ) {
      throw new ApiError(400, "Field are Required... !");
   }

   const existedUser = await User.findOne({ email });

   if (existedUser)
      throw new ApiError(400, "User Account Previously Created..");

   const profileImg = await uploadOnCloudinary(profilePicture);

   const newUserCreated = await User.create({
      fullName,
      email,
      password,
      profilePicture: profileImg.url,
   });
   return newUserCreated;
};


export async function loginUserAccount(email,password){
    
}