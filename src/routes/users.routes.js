import { Router } from "express";
import { userContoller } from "../controllers/user.controller.js";
import { roleAuth } from "../middlewares/roleAuth.js";
import { userValidator } from "../middlewares/user.validator.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const userRouter = Router()

userRouter.post("/register", userValidator, userContoller.register);

userRouter.post("/login", userContoller.login);

userRouter.get("/current", [ jwtAuth, roleAuth("user", "admin")], userContoller.privateData);

export default userRouter;