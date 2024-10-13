import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import {  createChatController, deleteChatController, showAllChatUserController, showChatController } from "../controllers/chat.controller.js";
const router = Router();


router.route("/delete-chat").delete(verifyUserAuthenticate,deleteChatController)
router.route("/show-chat/:id").get(verifyUserAuthenticate,showChatController)
router.route("/show-chat-user").get(verifyUserAuthenticate,showAllChatUserController)
router.route("/new-chat").post(verifyUserAuthenticate,createChatController)

export default router