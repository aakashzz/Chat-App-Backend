import {
    createChatService,
   deleteChatService,
   showAllChatUserService,
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
        const userId = req.params.id;
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
const createChatController = async function(req,res){
    try {
        const userId = req.user._id;
        const {ContactUserId} = req.body;
        if(!userId && !ContactUserId) throw new ApiError(400,"userId & contactUserId not here")
        const createChatResponse = await createChatService(ContactUserId,userId);
        if(!createChatResponse)throw new ApiError(500,"Internal Issue in createChat service");
        return res.status(200).json(
            new ApiResponse(200,createChatResponse,"SuccessFully Give Result")
        )
    } catch (error) {
        console.error(error)
        throw new ApiError(400,error.message)
    }
}

const showAllChatUserController = async function(req,res){
    try {
        const userId = req.user._id;
        const response = await showAllChatUserService(userId);
        if(!response)throw new ApiError(500,"Internal Issue in createChat service");
        return res.status(200).json(
            new ApiResponse(200,response,"SuccessFully Show Chat User")
        )
    } catch (error) {
        console.error(error)
        throw new ApiError(400,error.message)
    }
}
export { deleteChatController,showChatController,createChatController,showAllChatUserController };
