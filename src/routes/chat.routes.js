import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import {  deleteChatController, showChatController } from "../controllers/chat.controller.js";
const router = Router();


router.route("/delete-chat").delete(verifyUserAuthenticate,deleteChatController)
router.route("/show-chat").get(verifyUserAuthenticate,showChatController)

export default router