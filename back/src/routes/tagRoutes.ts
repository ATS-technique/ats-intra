import { Router } from "express";
import { add, getAllTags, getTag, editTag } from "../controller/tagController";

const router = Router();

router.post("/add", add);
router.get("/getAllTags", getAllTags);
router.get("/getTag/:id_tag", getTag);
router.post("/editTag", editTag);
export default router;
