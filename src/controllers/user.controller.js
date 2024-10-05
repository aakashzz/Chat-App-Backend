import { createNewUserAccount } from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
      console.log(error.message);
      // throw new ApiError(500,error?.message);
   }
};


const loginController = async function (req, res) {
   try {
      const { email, password } = req.body;

      

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
      console.log(error.message);
      // throw new ApiError(500,error?.message);
   }
};

export { registrationController };
