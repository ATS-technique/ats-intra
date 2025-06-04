"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controller/contactController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/add", contactController_1.add);
router.get("/getAll", auth_1.default, contactController_1.getAll);
router.get("/getContactByIdClient/:id_client", contactController_1.getContactsByIdClient);
exports.default = router;
