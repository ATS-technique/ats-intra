import { Router } from "express";
import { add, getAll, getContactsByIdClient } from "../controller/contactController";
import auth from "../middleware/auth";
const router = Router();

router.post("/add", add);
router.get("/getAll", auth, getAll);
router.get("/getContactByIdClient/:id_client", getContactsByIdClient);

export default router;
