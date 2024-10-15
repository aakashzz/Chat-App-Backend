import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import { createChatController, showChatUserController,deleteChatController } from "../controllers/chat.controller.js";


const router = Router();

router.route("/new-chat").post(verifyUserAuthenticate,createChatController)
router.route("/show-chat-user").get(verifyUserAuthenticate,showChatUserController)
router.route("/delete-chat/:id").delete(verifyUserAuthenticate,deleteChatController)

export default router