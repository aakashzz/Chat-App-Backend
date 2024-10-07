import { Router } from "express";
import { verifyUserAuthenticate } from "../middlewares/authenticate.middleware";
const router = Router();

router.route("/all-chat").get(verifyUserAuthenticate)

export default router