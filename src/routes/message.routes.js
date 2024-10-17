import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import {getChatUserProfileController, sendMessageController,showAllMessagesController} from "../controllers/message.controller.js"

const router = Router();

router.route("/send-message").post(verifyUserAuthenticate,sendMessageController);
router.route("/show-message/:id").get(verifyUserAuthenticate,showAllMessagesController);
router.route("/show-user-profile/:id").get(verifyUserAuthenticate,getChatUserProfileController);

export default router