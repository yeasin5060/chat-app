import {Router} from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { getMessage, getUsersForSidebar, markMessageAsSeen } from '../controllers/message.controller.js'

const router = Router()

router.route("/users").get(auth , getUsersForSidebar);
router.route("/:id").get(auth , getMessage);
router.route("/mark/:id").put(auth , markMessageAsSeen);
export default router