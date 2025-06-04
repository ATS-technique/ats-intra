"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controller/clientController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/addClient", clientController_1.add);
router.get("/getClient", clientController_1.getClient);
router.get("/getAll", clientController_1.getAll);
router.post("/editClientById", auth_1.default, clientController_1.editClientById);
exports.default = router;
