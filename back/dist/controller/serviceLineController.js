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
exports.getServiceLinesByIdProduct = exports.getServiceLinebyPk = exports.getAll = exports.add = void 0;
const serviceLine_1 = __importDefault(require("../model/serviceLine"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product, id_service, quantity } = req.body;
        const serviceLine = yield serviceLine_1.default.create({ id_product, id_service, quantity });
        res.status(201).json({ message: "Commande ajoutée", serviceLine });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceLines = yield serviceLine_1.default.findAll();
        if (serviceLines.length === 0) {
            res.status(404).json({ message: "Aucune Commande à ce jour" });
            return;
        }
        res.status(200).json({ serviceLines });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getServiceLinebyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_service_line } = req.body;
        const serviceLine = yield serviceLine_1.default.findByPk(id_service_line);
        if (!serviceLine) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ serviceLine });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getServiceLinebyPk = getServiceLinebyPk;
const getServiceLinesByIdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product } = req.body;
        const serviceLines = yield serviceLine_1.default.findAll({ where: { id_product } });
        if (!serviceLines || serviceLines.length === 0) {
            res.status(404).json({ message: "Aucune commande pour ce client" });
            return;
        }
        res.status(200).json({ serviceLines });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getServiceLinesByIdProduct = getServiceLinesByIdProduct;
