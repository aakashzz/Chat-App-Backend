import { Router } from "express";

import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import { allContactController } from "../controllers/contact.controller.js";

const router = Router();

router.route("/all-contact").get(verifyUserAuthenticate,allContactController)
router.route("/delete-contact/:_id").get(verifyUserAuthenticate,allContactController)


export default router