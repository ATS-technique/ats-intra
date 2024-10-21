"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const router = (0, express_1.Router)();
router.post("/add", orderController_1.add);
router.get("/getClientOrders", orderController_1.getOrderByIdClient);
router.get("/getAll", orderController_1.getAll);
exports.default = router;
