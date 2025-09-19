import { Router } from "express";
import { add, getAll, getProjectTypebyPk, getProjectTypeWithCoverImage } from "../controller/projectTypesController";
import auth from "../middleware/auth";

const router = Router();

router.post("/addProjectImage",auth, add);
router.get("/getAllProjectTypes", getAll);
router.get("/getProjectTypebyPk/:id_project_type", getProjectTypebyPk);
router.get("/getProjectTypeWithCoverImage", getProjectTypeWithCoverImage);

export default router;