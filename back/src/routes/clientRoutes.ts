import { Router } from "express";
import { add, getClient, getAll, editClientById } from "../controller/clientController";
import auth from "../middleware/auth";
const router = Router();

router.post("/addClient", add);
router.get("/getClient", getClient);
router.get("/getAll", getAll);
router.post("/editClientById", auth, editClientById);

export default router;
