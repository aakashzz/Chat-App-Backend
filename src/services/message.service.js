import ApiError from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";


export async function sendedMessageService(messageContent,sendedBy,_id){
    const newMessage = await Message.create({
        messageContent,
        sendedBy,
    });
    if(!newMessage)throw new ApiError(401,"Something While Wrong Check the SendMessage Service");
    const createChatOfUser = await Chat.create({
        messages:newMessage._id,
        createdBY:_id
    })
    if(!createChatOfUser)throw new ApiError(401,"Something While Wrong Check the SendMessage Service in Chat creation");
    newMessage.chat = createChatOfUser._id;
    await newMessage.save();
    return {newMessage, createChatOfUser}

}