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
   const allRequest = await Request.findOne({
      receiverId:senderId,
   }).select(" -password -accessToken")
   if (!allRequest) {
      throw new ApiError(401, "Id Not Correct for receiver");
   }

   return allRequest.populate("senderId");
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
   console.log(requestUpdated?.receiverId);
   if (status === "Accept") {
      const newContactCreate = await Contact.create({
         contactDetails: requestUpdated.receiverId,
      });
      if (!newContactCreate) throw new ApiError(400, "Contact Not be created");

      const user = await User.findByIdAndUpdate(
         requestUpdated.senderId,
         {
            $push: {
               contacts: newContactCreate,
            },
         },
         {
            new: true,
         }
      );

      await user.save();
   }
   if (!requestUpdated) throw new ApiError(401, "Request Not Updated");
   await requestUpdated.save();
   return { requestUpdated };
}

export async function deleteRequestService(requestId) {
   const requestDeleted = await Request.deleteOne({
      _id: requestId,
   });
   if (!requestDeleted) {
      throw new ApiError(400, "Request NoT deleted");
   }
   return { requestDeleted };
}
