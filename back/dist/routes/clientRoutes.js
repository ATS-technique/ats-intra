"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controller/clientController");
const router = (0, express_1.Router)();
router.post("/addClient", clientController_1.add);
router.get("/getClient", clientController_1.getClient);
exports.default = router;
