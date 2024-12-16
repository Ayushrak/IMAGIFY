import  {registeredUser,loginUser, userCredits, paymentRazorpay, verifyController} from "../controllers/userControllers.js";
import express from "express";
import userAuth from "../middlewares/auth.js";

const userRouter  =  express.Router();

userRouter.post("/register",registeredUser);
userRouter.post("/login",loginUser);
userRouter.get("/credits",userAuth,userCredits);
userRouter.post("/pay-razor",userAuth,paymentRazorpay);
userRouter.post("/verify-razor",verifyController);


export default userRouter;
