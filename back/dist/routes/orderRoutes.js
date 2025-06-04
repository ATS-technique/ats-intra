"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/add", orderController_1.add);
router.get("/getClientOrders", auth_1.default, orderController_1.getOrdersByIdClient);
router.get("/getAll", orderController_1.getAll);
router.get("/getOrderById/:id", auth_1.default, orderController_1.getOrderById);
router.get("/getMaxQuoteNumber", auth_1.default, orderController_1.getMaxQuoteNumber);
router.post("/validateOrder", auth_1.default, orderController_1.validateOrder);
router.post("/editOrderById", orderController_1.editOrderById);
exports.default = router;
