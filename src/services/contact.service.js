import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function getAllContactService(_id) {
   const allContactUser = await User.findById(_id).populate("contacts")
   .populate({
      path: "contacts",
      populate: {
         path: "contactDetails",
         model: "User",
      },
   });
   if (!allContactUser) throw new ApiError(501, "Contact not Capturing in DB ");
   return allContactUser.contacts
      
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
   console.log(deleteOneContact);
   if (!deleteOneContact) throw new ApiError(501, "Contact not Delete in DB ");
   return deleteOneContact;
}
