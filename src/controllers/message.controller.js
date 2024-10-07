import { sendedMessageService } from "../services/message.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendMessageController = async function (req, res) {
   try {
      const { messageContent } = req.body;
      const { sendedBy } = req.params;
      const { _id } = req.user; 

      if (!messageContent && !sendedBy && !_id) {
         throw new ApiError(400, "Required Parameter are Empty");
      }
      const { newMessage, createChatOfUser } = await sendedMessageService(
         messageContent,
         sendedBy,
         _id
      );
      return res.status(200).json(
        new ApiResponse(201,[newMessage,createChatOfUser],"Message Send SuccessFully")
      )
   } catch (error) {
      console.error(error);
      return new ApiError(error.message);
   }
};

export {sendMessageController}