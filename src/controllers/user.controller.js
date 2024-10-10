import {
   createNewUserAccount,
   loginUserAccount,
   logoutUserAccount,
} from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { optionsOfCookie } from "../constant/constant.js";

const registrationController = async function (req, res) {
   try {
      const { fullName, email, password } = req.body;
      const profilePicture = req.file?.path;
      console.log(req.file )
      console.log(profilePicture)
      const newUserDetails = await createNewUserAccount(
         fullName,
         email,
         password,
         profilePicture
      );

      return res
         .status(200)

         .json(
            new ApiResponse(
               200,
               newUserDetails,
               "New User Account SuccessFully Created.. !"
            )
         );
   } catch (error) {
      console.error(error.message);
     
   }
};

const loginController = async function (req, res) {
   try {
      const { email, password } = req.body;

      const { accessToken, existedUser } = await loginUserAccount(
         email,
         password
      );
      
      return res
      .status(200)
      .cookie("accessToken", accessToken, optionsOfCookie)
      .json(new ApiResponse(200, existedUser, "User Logged-In"));
   } catch (error) {
      console.log("This error",error.message);
      return new ApiError(500, error?.message);
   }
};

const logoutController = async function (req,res){
    try {
         const {id} = req.user;
         await logoutUserAccount(id);

         return res.status(200)
         .clearCookie("accessToken", optionsOfCookie)
         .json(
            new ApiResponse(200,[],'User SuccessFully Logout')
         )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, error?.message);
    }
}
const getUserController = async function (req,res){
    try {
         return res.status(200)
         .json(
            new ApiResponse(200,req.user,'User SuccessFully Logout')
         )
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, error?.message);
    }
}
export { registrationController, loginController, logoutController, getUserController };
