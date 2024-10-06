import { deleteContactService, getAllContactService } from "../services/contact.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const allContactController = async function(req,res){
    try {
        const {_id} = req.user;
        const allContactResponse = await getAllContactService(_id);
        if (!allContactResponse) {
            throw new ApiError(401,"UnAuthorized Contact Details");
        }
        console.log(allContactResponse);
        return res.status(200).json(
            new ApiResponse(200,allContactResponse,"All Contact Fetch")
        )
        
    } catch (error) {
        console.error(error.message)
    }
}
const deleteContactController = async function(req,res){
    try {
        const {_id} = req.params;
        const deleteOneContact = await deleteContactService(_id);
        if (!deleteOneContact) {
            throw new ApiError(401,"UnAuthorized Request Please Check User Id Details");
        }
        console.log(deleteOneContact);
        return res.status(200).json(
            new ApiResponse(200,[],"Delete Contact in DB")
        )
        
    } catch (error) {
        console.error(error.message)
    }
}

export {allContactController,deleteContactController}