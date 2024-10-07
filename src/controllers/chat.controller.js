import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const getAllChatController = async function(req,res){
    try {
        const { chatReceiverId} = req.body;
        
    } catch (error) {
        return new ApiError(500,error.message)
    }
}