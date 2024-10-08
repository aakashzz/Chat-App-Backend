import ApiError from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";


export async function sendedMessageService(messageContent,sendTo,_id){
    const newMessage = await Message.create({
        messageContent,
        receiver:sendTo,
        sendedBy:_id
    });
    if(!newMessage)throw new ApiError(401,"Something While Wrong Check the SendMessage Service");
    const createChatOfUser = await Chat.create({
        ContactUser:sendTo
    })
    if(!createChatOfUser)throw new ApiError(401,"Something While Wrong Check the SendMessage Service in Chat creation");
    await createChatOfUser.Messages.push(newMessage._id);
    await newMessage.save();
    await createChatOfUser.save();
    return {newMessage, createChatOfUser}

}