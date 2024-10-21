import { Router } from "express";
import { add, getOrderByIdClient, getAll} from "../controller/orderController";

const router = Router();

router.post("/add", add );
router.get("/getClientOrders", getOrderByIdClient);
router.get("/getAll", getAll);

export default router;