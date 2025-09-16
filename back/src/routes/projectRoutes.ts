import { Router } from "express";
import { add, getAll, getProjectbyPk, getProjectByType, update } from "../controller/projectController";
import auth from "../middleware/auth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/addProject", auth, upload.fields([{ name: "cover_image", maxCount: 1 }, { name: "images", maxCount: 20 }]), add);
router.put("/updateProject", auth, upload.single("cover_image"), update);
router.get("/getAll", getAll);
router.get("/getOne", getProjectbyPk);
router.get("/getProjectByType/:id_project_type", getProjectByType);      

export default router;