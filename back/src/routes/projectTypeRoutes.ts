import { Router } from "express";
import { add, getAll, getProjectTypebyPk } from "../controller/projectTypesController";

const router = Router();

router.post("/addProjectImage", add);
router.get("/getAll", getAll);
router.get("/getProjectTypebyPk/:id_project_type", getProjectTypebyPk);

export default router;