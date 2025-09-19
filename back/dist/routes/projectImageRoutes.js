"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectImagesController_1 = require("../controller/projectImagesController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024, files: 12 }, // 10 Mo, max 12 fichiers
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/"))
            cb(null, true);
        else
            cb(new Error("Type de fichier non supporté (image/* uniquement)"));
    },
});
router.post("/addProjectImage", auth_1.default, upload.single("image"), projectImagesController_1.add);
router.post("/addProjectImages", auth_1.default, upload.array("images", 12), projectImagesController_1.addMany);
router.get("/getAll", auth_1.default, projectImagesController_1.getAll);
router.get("/getProjectImagebyPk/:id_project_image", auth_1.default, projectImagesController_1.getProjectImagebyPk);
router.delete("/deleteProjectImage", auth_1.default, projectImagesController_1.deleteProjectImageById);
exports.default = router;
