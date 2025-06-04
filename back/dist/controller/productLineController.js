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
exports.getOrderByIdClient = exports.isOrderExisting = exports.getOrderbyPk = exports.getAll = exports.add = void 0;
const order_1 = __importDefault(require("../model/order"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderCheck = yield (0, exports.isOrderExisting)(req, res);
        if (orderCheck) {
            res.status(409).json({ message: "Ce numéro de devis est déja attribué" });
            return;
        }
        const { id_order, id_client, site_name, ordered_at, id_deposit, site_address } = req.body;
        const order = yield order_1.default.create({ id_order, id_client, site_name, ordered_at, id_deposit, site_address });
        res.status(201).json({ message: "Commande ajoutée", order });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll();
        if (orders.length === 0) {
            res.status(404).json({ message: "Aucune Commande à ce jour" });
            return;
        }
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getOrderbyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ order });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderbyPk = getOrderbyPk;
const isOrderExisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.isOrderExisting = isOrderExisting;
const getOrderByIdClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_client } = req.body;
        const order = yield order_1.default.findAll({ where: { id_client } });
        if (!order) {
            res.status(404).json({ message: "Aucune commande pour ce client" });
            return;
        }
        res.status(200).json({ order });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderByIdClient = getOrderByIdClient;
