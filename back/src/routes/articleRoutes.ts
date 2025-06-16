import { Router } from "express";
import { add, getAll } from "../controller/articleController";
import auth from "../middleware/auth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/addArticle",auth, upload.single("image"), add);
router.get("/getAll", auth, getAll);

export default router;
