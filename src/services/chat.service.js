import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function createChatService(userId, receiverId) {
   const newChatResponse = await Chat.create({
      user: [userId, receiverId],
   });
   if (!newChatResponse) new ApiError(401, "new Chat Not create");
   console.log(newChatResponse);
   return newChatResponse;
}

export async function showAllChatUserService(userId) {
   const showChatUserResponse = await Chat.find({
      user: userId,
   }).populate("user");
   if (!showChatUserResponse) throw new ApiError(400, "Show Chat Not Work");
   return showChatUserResponse;
}
export async function deleteChatService(chatId) {
   const deleteChatResponse = await Chat.find({
      _id: chatId,
   },{new:true});
   if (!deleteChatResponse) throw new ApiError(400, "Chat Delete Not Work");
   return deleteChatResponse;
}
