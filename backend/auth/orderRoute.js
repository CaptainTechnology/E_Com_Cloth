
import express from "express"
import { Add, Get , GetAdminOrders,Update } from "../controller/orderController.js";
import middleware from "../middleware/middleware.js";

const orderRoute=express.Router();

orderRoute.post("/add",middleware,Add);
orderRoute.post("/get",middleware,Get)
orderRoute.get("/getAdmin",GetAdminOrders)
orderRoute.post("/update",Update)

export default orderRoute;