import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export async function verifyUserAuthenticate(req, res, next) {
   try {
      const token = req.cookies?.accessToken;

      if (!token) throw new ApiError(400, "Unauthorized Token");

      const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decodedToken) {
         return new ApiError(401, "Token Are Expire Login now");
      }
      const user = await User.findById(decodedToken.id).select("-password -accessToken");
      if (!user) {
         return new ApiError(401, "Invalid Access Token");
      }
      req.user = user;
      next();
   } catch (error) {
      console.error("decoded value Err", error.message);
      return new ApiError(500, `Verify Auth ${error.message}`);
   }
}
