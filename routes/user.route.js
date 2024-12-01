import express from "express"
import { userGetInfo, userLogin, userLogout, userRegister } from "../controllers/user.contollers.js";
const userRouter  = express.Router()

userRouter.post("/user-register",userRegister);
userRouter.get("/user-me",userGetInfo);
userRouter.get("/user-logout",userLogout);
userRouter.post("/user-login",userLogin);

export default userRouter;
