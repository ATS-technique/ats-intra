import { Router } from "express";
import { add, getpressMention, getAll, editPressMention, deletePressMention } from "../controller/pressMentionController";
import auth from "../middleware/auth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/addPressMention", auth,  upload.single("image"), add);
router.get("/getAllPressMentions", getAll);
router.get("/getPressMention/:id", auth, getpressMention);
router.post("/editPressMention", auth, upload.single("image"), editPressMention);
router.post("/deletePressMention", auth, deletePressMention);

export default router;
