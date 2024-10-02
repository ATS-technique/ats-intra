"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/profile", auth_1.default, userController_1.getProfile);
router.post("/activate", auth_1.default, userController_1.activate);
router.post("/deactivate", auth_1.default, userController_1.deactivate);
router.post("/updatePassword", auth_1.default, userController_1.updatePassword);
router.post("/updateUser", auth_1.default, userController_1.updateUser);
exports.default = router;
