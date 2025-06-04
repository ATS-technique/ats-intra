"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByOrder = exports.getProductbyPk = exports.getAll = exports.add = void 0;
const product_1 = __importDefault(require("../model/product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order, designation, quantity, id_status, unit } = req.body;
        const user = yield product_1.default.create({ id_order, designation, quantity, id_status, unit });
        res.status(201).json({ message: "Produit ajoutée", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findAll();
        if (products.length === 0) {
            res.status(404).json({ message: "Aucun produit à ce jour" });
            return;
        }
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getProductbyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product } = req.body;
        const product = yield product_1.default.findByPk(id_product);
        if (!product) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductbyPk = getProductbyPk;
const getProductByOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order } = req.params;
        const product = yield product_1.default.findAll({ where: { id_order } });
        if (!product) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductByOrder = getProductByOrder;
