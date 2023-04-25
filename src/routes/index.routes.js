import { Router } from "express";
import usersRouter from "../routes/users.routes.js";
import transactionRouter from "./transactions.routes.js";

const router = Router();
router.use(usersRouter);
router.use(transactionRouter);

export default router;
