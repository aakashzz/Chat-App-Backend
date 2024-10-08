import { createChatService, deleteChatService } from "../services/chat.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const deleteChatController = async function (req,res) {
    try {
        const { chatId} = req.body;
        if(!chatId) throw new ApiError(401,"Chat ID not Here");
        const deletedChatResponse = await deleteChatService(chatId);
        return res.status(201).json(
            new ApiResponse(201,deletedChatResponse,"Chat Deleted ")
        )
    } catch (error) {
        return new ApiError(500,error.message)
    }
}

export {createChatController,deleteChatController}