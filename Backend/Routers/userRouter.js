import express from "express";
import { createUser,getUserData,loginUser } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",createUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile",getUserData)


export default userRouter;