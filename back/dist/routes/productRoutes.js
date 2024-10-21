"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
router.post("/addProduct", productController_1.add);
router.get("/getAll", productController_1.getAll);
router.get("/getOne", productController_1.getProductbyPk);
exports.default = router;
