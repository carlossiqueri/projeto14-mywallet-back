import { Router } from "express";
import { revenue } from "../controllers/transactions.controller.js";
import { outgoing } from "../controllers/transactions.controller.js";
import { transactionsSchema } from "../schemas/transactions.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const transactionRouter = Router();

transactionRouter.post(
  "/nova-transacao/:revenue",
  validateSchema(transactionsSchema),
  revenue
);
transactionRouter.post(
  "/nova-transacao/:outoing",
  validateSchema(transactionsSchema),
  outgoing
);

export default transactionRouter;
