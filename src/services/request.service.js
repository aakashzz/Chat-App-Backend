import { Request } from "../models/request.model.js";
import ApiError from "../utils/ApiError.js";
import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";

export async function newRequestCreateService(senderID, receiverId) {
   const requestCreated = await Request.create({
      senderId: senderID,
      receiverId: receiverId,
   });

   if (!requestCreated) throw new ApiError(400, "Request No Created");
   return { requestCreated };
}

export async function receiverAllRequestService(senderId) {
   const allRequest = await Request.find({
      receiverId:senderId,
   }).populate("senderId").select(" -password -accessToken")
   if (!allRequest) {
      return new ApiError(401, "request are empty");
   }
   
   // const allRequestCollection = await allRequest.map((value)=>value.populate("senderId"));
   return allRequest
}  

export async function updateRequestStatus(requestId, status) {
   const requestUpdated = await Request.findByIdAndUpdate(
      requestId,
      {
         $set: {
            status: status,
         },
      },
      {
         new: true,
      }
   );
   if (status === "Accept") {
      const newContactCreate = await Contact.create({
         contactDetails: requestUpdated.receiverId,
         userId:requestUpdated.senderId,
      });
      if (!newContactCreate) throw new ApiError(400, "Contact Not be created");

     //request === "Accept and Reject Request will remove"
   }
   
   if (!requestUpdated) new ApiError(401, "Request Not Updated");
   const deletedRequest = await Request.findByIdAndDelete({_id:requestUpdated._id},{new:true})

   return  deletedRequest ;
}


