import { Router } from "express";
import { add, getpressMention, getAll, editPressMention } from "../controller/pressMentionController";
import auth from "../middleware/auth";

const router = Router();

router.post("/addPressMention", auth, add);
router.get("/getAllPressMentions", auth, getAll);
router.get("/getPressMention/:id", auth, getpressMention);
router.post("/getMaxQuoteNumber", auth, editPressMention);

export default router;
