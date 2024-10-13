import { Chat } from "../models/chat.model.js";
import ApiError from "../utils/ApiError.js";


export async function deleteChatService(chatId){
    const deletedChat = await Chat.findByIdAndDelete(chatId,{new:true});
    if(!deletedChat)throw new ApiError(400,"Chat Not Deleted")
        return deletedChat
}

export async function showChatService(userId) {
    const allChats = await Chat.find({
        ContactUserId:userId
    }).populate("Messages")
    
    if(!allChats)throw new ApiError(401,"Chats Not Showing Something Wrong");

    return allChats 
}

export async function createChatService(ContactUserId,_id){
    const newChat = await Chat.create({
        id:_id,
        ContactUserId,
    });
    if(!newChat)throw new ApiError(400,"Chat Not Create");
    return newChat

}
export async function showAllChatUserService(_id){
    const newChat = await Chat.find({
        id:_id,
    }).populate("ContactUserId")
    if(!newChat)throw new ApiError(400,"All User Not Shoe");
    return newChat

}