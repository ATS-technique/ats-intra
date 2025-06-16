import { Router } from "express";
import { add, getpressMention, getAll, editPressMention } from "../controller/pressMentionController";
import auth from "../middleware/auth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/addPressMention", auth,  upload.single("image"), add);
router.get("/getAllPressMentions", getAll);
router.get("/getPressMention/:id", auth, getpressMention);
router.post("/getMaxQuoteNumber", auth, editPressMention);

export default router;
