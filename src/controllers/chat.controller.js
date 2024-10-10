import {
   deleteChatService,
   showChatService,
} from "../services/chat.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const deleteChatController = async function (req, res) {
   try {
      const { chatId } = req.body;
      if (!chatId) throw new ApiError(401, "Chat ID not Here");
      const deletedChatResponse = await deleteChatService(chatId);
      return res
         .status(201)
         .json(new ApiResponse(201, deletedChatResponse, "Chat Deleted "));
   } catch (error) {
      return new ApiError(500, error.message);
   }
};

const showChatController = async function(req,res){
    try {
        const {userId} = req.body;
        if(!userId)throw new ApiError(400,"userId not here")
        const showAllChatResponse = await showChatService(userId);
        if(!showAllChatResponse)throw new ApiError(500,"Internal Issue in ShowAllChat service");
        return res.status(200).json(
            new ApiResponse(200,showAllChatResponse,"SuccessFully Give Result")
        )
    } catch (error) {
        throw new ApiError(400,error?.message)
    }
}

export { deleteChatController,showChatController };
