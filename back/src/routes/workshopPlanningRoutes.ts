import { Router } from "express";
import { add, getAll, setAchieved, editPriority } from "../controller/worshopPlanningController";

const router = Router();

router.post("/add", add);
router.get("/getAll", getAll);
router.post("/setAchieved", setAchieved);
router.post("/editPriority", editPriority);

export default router;
