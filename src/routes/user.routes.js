import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registrationController } from "../controllers/user.controller.js";

const router = Router();

router.route("/registration").post(upload.single("profilePicture"),registrationController)

export default router