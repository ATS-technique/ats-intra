"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pressMentionController_1 = require("../controller/pressMentionController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = (0, express_1.Router)();
router.post("/addPressMention", auth_1.default, upload.single("image"), pressMentionController_1.add);
router.get("/getAllPressMentions", pressMentionController_1.getAll);
router.get("/getPressMention/:id", auth_1.default, pressMentionController_1.getpressMention);
router.post("/editPressMention", auth_1.default, upload.single("image"), pressMentionController_1.editPressMention);
router.post("/deletePressMention", auth_1.default, pressMentionController_1.deletePressMention);
exports.default = router;
