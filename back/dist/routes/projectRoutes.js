"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controller/projectController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = (0, express_1.Router)();
router.post("/addProject", auth_1.default, upload.fields([{ name: "cover_image", maxCount: 1 }, { name: "images", maxCount: 20 }]), projectController_1.add);
router.put("/updateProject", auth_1.default, upload.single("cover_image"), projectController_1.update);
router.get("/getAll", projectController_1.getAll);
router.get("/getOne", projectController_1.getProjectbyPk);
router.get("/getProjectByType/:id_project_type", projectController_1.getProjectByType);
exports.default = router;
