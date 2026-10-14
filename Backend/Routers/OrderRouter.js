import express from "express";
import {CreateOrder ,getOrders, UpdateNotesAndStatus} from "../Controllers/OrderController.js"

const orderRouter = express.Router();

orderRouter.post("/",CreateOrder)
orderRouter.get("/:pageSize/:pageNumber",getOrders)
orderRouter.put("/:orderId", UpdateNotesAndStatus)

export default orderRouter;