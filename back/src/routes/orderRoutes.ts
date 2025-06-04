import { Router } from "express";
import {
  add,
  getOrdersByIdClient,
  getAll,
  getOrderById,
  getMaxQuoteNumber,
  validateOrder,
  editOrderById,
} from "../controller/orderController";
import auth from "../middleware/auth";

const router = Router();

router.post("/add", add);
router.get("/getClientOrders", auth, getOrdersByIdClient);
router.get("/getAll", getAll);
router.get("/getOrderById/:id", auth, getOrderById);
router.get("/getMaxQuoteNumber", auth, getMaxQuoteNumber);
router.post("/validateOrder", auth, validateOrder);
router.post("/editOrderById", editOrderById);
export default router;
