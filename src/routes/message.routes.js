import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import { sendMessageController } from "../controllers/message.controller.js";

const router = Router();

router.route("/send-message").post(verifyUserAuthenticate,sendMessageController)

export default router