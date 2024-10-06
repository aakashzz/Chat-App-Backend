import { Contact } from "../models/contact.model.js";
import ApiError from "../utils/ApiError.js";

export async function getAllContactService(_id) {
   const allContactUser = await Contact.findOne({
      createdBy: _id,
   });
   if (!allContactUser) throw new ApiError(501, "Contact not Capturing in DB ");
   return allContactUser.populate("userDetails");
}
export async function deleteContactService(_id) {
   const deleteOneContact = await Contact.findOneAndDelete(
      {
         userDetails: _id,
      },
      {
         new: true,
      }
   );
   if (!deleteOneContact) throw new ApiError(501, "Contact not Delete in DB ");
   return deleteOneContact;
}
