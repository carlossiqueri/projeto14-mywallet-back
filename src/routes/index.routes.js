import { Router } from "express";
import usersRouter from "../routes/users.routes.js"

const router = Router();
router.use(usersRouter)


export default router;