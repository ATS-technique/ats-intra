import { Router } from "express";
import { add, getAll, getProductbyPk, getProductByOrder } from "../controller/productController";

const router = Router();

router.post("/addProduct", add);
router.get("/getAll", getAll);
router.get("/getOne", getProductbyPk);
router.get("/getProductbyOrder/:id_order", getProductByOrder);

export default router;
