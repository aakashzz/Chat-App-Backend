import { Contact } from "../models/contact.model.js";
import ApiError from "../utils/ApiError.js";

//show all contact method
export async function getAllContactService(_id) {
   const allContactUser = await Contact.find({ userId: _id })
      .populate("contactDetails")
      .select("-password -accessToken -contacts");
   if (!allContactUser) throw new ApiError(501, "Contact not Capturing in DB ");
   return allContactUser;
}

//delete contact method
export async function deleteContactService(id) {
   const deleteOneContact = await Contact.findOneAndDelete(
      {
         _id: id,
      }
   );
   if (!deleteOneContact) throw new ApiError(501, "Contact not Delete in DB ");
   return deleteOneContact;
}
