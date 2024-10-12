import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registrationController,loginController, logoutController, getUserController, findAllUserController } from "../controllers/user.controller.js";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route("/registration").post(upload.single("profilePicture"),registrationController)
router.route("/login").post(loginController)
router.route("/logout").get(verifyUserAuthenticate,logoutController)
router.route("/getUser").get(verifyUserAuthenticate,getUserController)
router.route("/findAllUser").post(verifyUserAuthenticate,findAllUserController)

export default router