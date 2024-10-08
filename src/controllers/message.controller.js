import { sendedMessageService } from "../services/message.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendMessageController = async function (req, res) {
   try {
      const { messageContent, sendTo } = req.body;
      const { _id } = req.user; 

      if (!messageContent && !sendTo && !_id) {
         throw new ApiError(400, "Required Parameter are Empty");
      }
     const {createChatOfUser,newMessage} = await sendedMessageService(messageContent,sendTo,_id)
     console.log(createChatOfUser)
     console.log(newMessage)
     return res.status(200).json(
      new ApiResponse(201,newMessage,"Send Message")
     )
   } catch (error) {
      console.error(error);
      throw new ApiError(500,error.message);
   }
};

export {sendMessageController}