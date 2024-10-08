import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import {  deleteChatController } from "../controllers/chat.controller.js";
const router = Router();


router.route("/delete-chat").get(verifyUserAuthenticate,deleteChatController)

export default router