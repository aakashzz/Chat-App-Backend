import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function getAllContactService(_id) {
   const allContactUser = await Contact.find({ userId: _id })
      .populate("contactDetails")
      .select("-password -accessToken -contacts");
   if (!allContactUser) throw new ApiError(501, "Contact not Capturing in DB ");
   return allContactUser;
}
export async function deleteContactService(id) {
   const deleteOneContact = await Contact.findOneAndDelete(
      {
         _id: id,
      },
      {
         new: true,
      }
   );
   if (!deleteOneContact) throw new ApiError(501, "Contact not Delete in DB ");
   return deleteOneContact;
}
