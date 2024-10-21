import { Router } from "express";
import { add, getAll, getProductbyPk } from "../controller/productController";

const router = Router();

router.post("/addProduct", add );
router.get("/getAll", getAll);
router.get("/getOne", getProductbyPk);

export default router;