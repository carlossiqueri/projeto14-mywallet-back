import { Router } from "express";
import { singup } from "../controllers/users.controller.js";
import { singin } from "../controllers/users.controller.js";
import { userAuth } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { usersSchema } from "../schemas/usersSchema.schema.js";

const usersRouter = Router();

usersRouter.post("/cadastro", validateSchema(usersSchema), singup);
usersRouter.post("/login", singin);
usersRouter.get("/logged-user", userAuth);

export default usersRouter;
