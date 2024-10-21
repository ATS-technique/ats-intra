import { Router } from "express";
import { add, getClient } from "../controller/clientController";

const router = Router();

router.post("/addClient", add );
router.get("/getClient", getClient);

export default router;