"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pressMentionController_1 = require("../controller/pressMentionController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/addPressMention", auth_1.default, pressMentionController_1.add);
router.get("/getAllPressMentions", auth_1.default, pressMentionController_1.getAll);
router.get("/getPressMention/:id", auth_1.default, pressMentionController_1.getpressMention);
router.post("/getMaxQuoteNumber", auth_1.default, pressMentionController_1.editPressMention);
exports.default = router;
