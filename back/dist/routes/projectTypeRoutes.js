"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectTypesController_1 = require("../controller/projectTypesController");
const router = (0, express_1.Router)();
router.post("/addProjectImage", projectTypesController_1.add);
router.get("/getAll", projectTypesController_1.getAll);
router.get("/getProjectTypebyPk/:id_project_type", projectTypesController_1.getProjectTypebyPk);
exports.default = router;
