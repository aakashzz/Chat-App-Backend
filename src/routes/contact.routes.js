import { Router } from "express";

import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import { allContactController,deleteContactController } from "../controllers/contact.controller.js";

const router = Router();

router.route("/all-contact").get(verifyUserAuthenticate,allContactController)
router.route("/delete-contact").get(verifyUserAuthenticate,deleteContactController)


export default router