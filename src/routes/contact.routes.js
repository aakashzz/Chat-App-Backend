import { Router } from "express";

import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware.js";
import { allContactController,deleteContactController } from "../controllers/contact.controller.js";

const router = Router();

router.route("/all-contact").get(verifyUserAuthenticate,allContactController)
router.route("/delete-contact/:id").delete(verifyUserAuthenticate,deleteContactController)


export default router