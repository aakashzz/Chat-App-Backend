import {
   createChatService,

   deleteChatService,
   showAllChatUserService,
} from "../services/chat.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createChatController = async function (req, res) {
   try {
      const userId = req.user._id;
      const { receiverId } = req.body;
      if (!userId && !receiverId)
         throw new ApiError(400, "IDs Not Here Please Check");
      const result = await createChatService(userId, receiverId);
      return res
         .status(200)
         .json(new ApiResponse(201, result, "Chat Will Be Created"));
   } catch (error) {
      console.error("create Chat error in backend", error);
      res.status(error.statusCode).json(new ApiResponse(error?.statusCode, error, error?.message));
   }
};


const showChatUserController = async function (req, res) {
   try {
      const userId = req.user._id;
      // const {type} = req.body;
      const resultOfAllChatUser = await showAllChatUserService(userId );
      console.log(resultOfAllChatUser)

      if (!resultOfAllChatUser) throw new ApiError(400, "All Chat User");
      return res
         .status(200)
         .json(new ApiResponse(200, resultOfAllChatUser, "All User Fetch"));
   } catch (error) {
      console.error("Show Chat User Error in backend", error);
      res.status(error.statusCode).json(new ApiResponse(error?.statusCode, error, error?.message));
   }
};


const deleteChatController = async function (req, res) {
   try {
      const chatId = req.params.id;
      const resultOfDeleteChat = await deleteChatService(chatId);
      if (!resultOfDeleteChat) throw new ApiError(400, "Chat Has Not Deleted");
      return res
         .status(200)
         .json(new ApiResponse(200, [], "Chat Delete SuccessFully"));
   } catch (error) {
      console.error("Delete Chat Error in backend", error);
      res.status(error.statusCode).json(new ApiResponse(error?.statusCode, error, error?.message));
   }
};



export {
   createChatController,
   showChatUserController,
   deleteChatController,
};
