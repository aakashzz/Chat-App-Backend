import { Chat } from "../models/chat.model.js";
import ApiError from "../utils/ApiError.js";

//create chat service
export async function createChatService(userId, receiverId) {
   const newChatResponse = await Chat.create({
      user: [userId, receiverId],
   });
   if (!newChatResponse) new ApiError(401, "new Chat Not create");
   console.log(newChatResponse);
   return newChatResponse;
}

//show all User Service
export async function showAllChatUserService(userId) {
   const showChatUserResponse = await Chat.find({
      user: userId,
   }).populate("user");

   if (!showChatUserResponse) throw new ApiError(400, "Show Chat Not Work");

   //this method filter not logged in user details
   const allContactFilter = showChatUserResponse.map((value) => {
      return value.user.filter((data) => !data.equals(userId));
   }); 

   //chat id filter 
   const onlyChatId = showChatUserResponse.map((value) => value._id);

   let newContactUserFilter = [allContactFilter, onlyChatId];

   return newContactUserFilter;
}

//delete Chat Service
export async function deleteChatService(chatId) {
   const deleteChatResponse = await Chat.find(
      {
         _id: chatId,
      },
      { new: true }
   );
   if (!deleteChatResponse) throw new ApiError(400, "Chat Delete Not Work");
   return deleteChatResponse;
}
