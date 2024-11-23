import {
   createNewUserAccount,
   loginUserAccount,
   logoutUserAccount,
   getAllUserAccount,
} from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { optionsOfCookie } from "../constant/constant.js";

const registrationController = async function (req, res) {
   try {
      const { fullName, email, password } = req.body;
      const profilePicture = req.file?.path;
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
      console.error(error);
      res.status(error.statusCode).json(new ApiResponse(error?.statusCode, error, error?.message));
     
   }
};

const loginController = async function (req, res) {
   try {
      const { email, password } = req.body;

      const { accessToken, existedUser } = await loginUserAccount(
         email,
         password
      );
      return( res
      .status(200)
      .cookie("accessToken", accessToken, optionsOfCookie)
      .json(new ApiResponse(200, existedUser, "User Logged-In")))
   } catch (error) {
      console.error("This error",error);
      if (error instanceof ApiError) {
         console.error("This error",error.message);
         return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, error, error.message));

      }
      return res.status(500).json(new ApiResponse(500, error, error?.message));
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
        res.status(400).json(new ApiError(500, error?.message, error));
    }
}
const getUserController = async function (req,res){
    try {
         return res.status(200)
         .json(
            new ApiResponse(200,req.user,'Getting User Details SuccessFully')
         )
    } catch (error) {
        console.log(error.message);
        res.status(500).json(new ApiError(500, error?.message, error));
    }
}
const findAllUserController = async function (req,res){
    try {
      const {userName} = req.body;
      if(!userName) throw new ApiError(401,"UserName not here")
         const responseAllUser = await getAllUserAccount(userName);
      if(!responseAllUser) new ApiError(401,"User not here")
         return res.status(200)
         .json(
            new ApiResponse(200,responseAllUser,' SuccessFully Fetch All User')
         )
    } catch (error) {
        console.log(error.message);
        res.status(500).json(new ApiError(500, error?.message, error));
    }
}
export { registrationController, loginController, logoutController, getUserController,findAllUserController };
