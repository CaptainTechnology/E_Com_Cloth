
import express from "express"
import { Add, Edit, Get, Remove, RemoveAll } from "../controller/cartController.js";
import middleware from "../middleware/middleware.js";

const cartRoute=express.Router();

cartRoute.post("/add",middleware,Add);
cartRoute.post("/get",middleware,Get)
cartRoute.post("/remove",middleware,Remove)
cartRoute.post("/edit",middleware,Edit)
cartRoute.post("/removeAll",middleware,RemoveAll)

export default cartRoute;