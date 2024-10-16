
import express from "express"
import { Add, Get } from "../controller/orderController.js";
import middleware from "../middleware/middleware.js";

const orderRoute=express.Router();

orderRoute.post("/add",middleware,Add);
orderRoute.post("/get",middleware,Get)

export default orderRoute;