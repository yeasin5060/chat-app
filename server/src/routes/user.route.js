import {Router} from 'express'
import { checkAuth, login, signup, updateprofile } from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router()

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/update-profile").put( auth , updateprofile);
router.route("/check").get(auth , checkAuth);
export default router