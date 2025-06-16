"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controller/articleController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = (0, express_1.Router)();
router.post("/addArticle", auth_1.default, upload.single("image"), articleController_1.add);
router.get("/getAll", auth_1.default, articleController_1.getAll);
exports.default = router;
