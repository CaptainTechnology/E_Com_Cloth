

import express from 'express'
import  {Register, Login, AdminLogin } from '../controller/userController.js';

const userRoute=express.Router();
userRoute.post("/register",Register);  
userRoute.post("/login",Login);  
userRoute.post("/adminLogin",AdminLogin)

export default userRoute;