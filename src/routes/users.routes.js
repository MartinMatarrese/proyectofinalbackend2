import { Router } from "express";
import { userContoller } from "../controllers/user.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const userRouter = Router()

userRouter.post("/register", userContoller.register);

userRouter.post("/login", userContoller.login);

userRouter.get("/current", [ passportCall("current"), roleAuth("user", "admin")], userContoller.privateData);

export default userRouter;