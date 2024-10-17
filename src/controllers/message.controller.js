import {
   getChatUserProfileService,
   sendMessageService,
   showAllMessagesService,
} from "../services/message.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendMessageController = async function (req, res) {
   try {
      const userId = req.user._id;
      const { messageContent, chatId } = req.body;
      if (!chatId && !userId && !messageContent)
         new ApiError(401, "Required Filed Is Empty");
      const responseOfNewMessage = await sendMessageService(
         chatId,
         userId,
         messageContent
      );
      if (!responseOfNewMessage)
         new ApiError(400, "In Service Not Message Building");
      return res.status(201).json(new ApiResponse(201, responseOfNewMessage));
   } catch (error) {
      console.error(error);
      return new ApiError(
         500,
         error.message || "This Error in sendMessageController"
      );
   }
};

const showAllMessagesController = async function (req, res) {
   try {
      const chatId = req.params.id;
      if (!chatId) new ApiError(401, "Required Filed Is Empty");
      const responseOfAllMessage = await showAllMessagesService(chatId);
      if (!responseOfAllMessage)
         new ApiError(400, "In Service Not Message Fetching");
      return res.status(201).json(new ApiResponse(201, responseOfAllMessage));
   } catch (error) {
      console.error(error);
      return new ApiError(
         500,
         error.message || "This Error in showAllMessageController"
      );
   }
};

const getChatUserProfileController = async function (req, res) {
   try {
      const chatId = req.params.id;
      const userId = req.user._id;
      console.log(chatId, userId);
      if (!chatId) new ApiError(401, "Required Filed Is Empty");
      const responseOfGetChatUser = await getChatUserProfileService(
         userId,
         chatId
      );
      console.log("Response", responseOfGetChatUser);
      if (!responseOfGetChatUser)
         new ApiError(400, "In Service Not Message Fetching");
      return res.status(200).json(new ApiResponse(201, responseOfGetChatUser));
   } catch (error) {
      console.error(error);
      return new ApiError(500, error.message || "This Error in getChatUser");
   }
};

export {
   sendMessageController,
   showAllMessagesController,
   getChatUserProfileController,
};
