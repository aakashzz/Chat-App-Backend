import { Router } from "express";
import {newRequestCreateController,receiveAllRequestController,removeRequestController,updateRequestStatusController} from "../controllers/request.controller.js"
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route("/new-request").post(verifyUserAuthenticate,newRequestCreateController);
router.route("/receive-all-request").get(verifyUserAuthenticate,receiveAllRequestController);
router.route("/remove-request").post(verifyUserAuthenticate,removeRequestController);
router.route("/update-request").patch(verifyUserAuthenticate,updateRequestStatusController);


export default router