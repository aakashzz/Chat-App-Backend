import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import {sendMessageController,showAllMessagesController} from "../controllers/message.controller.js"

const router = Router();

router.route("/send-message").post(verifyUserAuthenticate,sendMessageController);
router.route("/show-message/:id").get(verifyUserAuthenticate,showAllMessagesController);

export default router