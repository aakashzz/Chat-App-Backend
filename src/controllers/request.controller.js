import {
   deleteRequestService,
   newRequestCreateService,
   receiverAllRequestService,
   updateRequestStatus,
} from "../services/request.service.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const newRequestCreateController = async function (req, res) {
   const { receiverId } = req.body;
   const senderId = req.user?._id;
   if (!receiverId) throw new ApiError(401, "ID Not Here");

   const newRequestCreated = await newRequestCreateService(
      senderId,
      receiverId
   );
   return res
      .status(200)
      .json(new ApiResponse(200, newRequestCreated, "Request Created"));
};

const receiveAllRequestController = async function (req, res) {
   const { _id } = req.user;
   const allRequest = await receiverAllRequestService(_id);
   return res
      .status(200)
      .json(new ApiResponse(200, allRequest, "All Request Have Show"));
};

const updateRequestStatusController = async function (req, res) {
   const { requestId, status } = req.body;
   if (!(requestId && status)) throw new ApiError("Require Filed Empty");
   const { requestUpdated } = await updateRequestStatus(requestId, status);

   res.status(200).json(
      new ApiResponse(201, requestUpdated, "Request Updated")
   );
};

const removeRequestController = async function (req, res) {
   const { requestId } = req.body;
   if (!requestId) throw new ApiError(401, "Request ID not here");
   await deleteRequestService(requestId);
   return res
      .status(201)
      .json(new ApiResponse(201, [], "Request Delete SuccessFully"));
};

export {
   newRequestCreateController,
   receiveAllRequestController,
   updateRequestStatusController,
   removeRequestController,
};
