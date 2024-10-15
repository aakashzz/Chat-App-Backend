import ApiError from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";

export async function sendMessageService(chatId,userId,contentOfMessage){
   const findChatIdResponse = await Chat.findById(chatId);
   if(!findChatIdResponse)throw new ApiError(401,"Chat ID Is not Correct");
   //create new Message 
   const newMessageResponse = await Message.create({
      chatId:chatId,
      messageContent:contentOfMessage,
      sendedBy:userId,
   });
   if(!newMessageResponse) throw new ApiError(400,"Message Not Created");
   return newMessageResponse
}

export async function showAllMessagesService(chatId){
   const fetchMessage = await Message.find({chatId:chatId}).populate("messageContent").populate("sendedBy");
   if(!fetchMessage) throw new ApiError(400,"Message Not Fetch And Show");
   return fetchMessage
}