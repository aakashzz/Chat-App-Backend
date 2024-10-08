import { Chat } from "../models/chat.model.js";
import ApiError from "../utils/ApiError.js";



export async function deleteChatService(chatId){
    const deletedChat = await Chat.findByIdAndDelete(chatId,{new:true});
    if(!deletedChat)throw new ApiError(400,"Chat Not Deleted")
        return deletedChat
}