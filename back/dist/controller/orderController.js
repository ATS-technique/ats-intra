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
exports.setPaid = exports.setBilled = exports.getOrderById = exports.editOrderById = exports.validateOrder = exports.getOrdersByIdClient = exports.isOrderExisting = exports.getOrderbyPk = exports.getAll = exports.getMaxQuoteNumber = exports.add = void 0;
const order_1 = __importDefault(require("../model/order"));
const dotenv_1 = __importDefault(require("dotenv"));
const clientController_1 = require("../controller/clientController");
const userController_1 = require("../controller/userController");
const contactController_1 = require("../controller/contactController");
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderCheck = yield (0, exports.isOrderExisting)(req, res);
        if (orderCheck) {
            res.status(409).json({ message: "Ce numéro de devis est déja attribué" });
            return;
        }
        const { id_order, id_client, quote_number, site_name, object, comment, id_contact, ordered_at, deposit_rate, site_address, reference, id_user, } = req.body;
        const order = yield order_1.default.create({
            id_order,
            id_client,
            quote_number,
            site_name,
            object,
            comment,
            id_contact,
            ordered_at,
            deposit_rate,
            site_address,
            reference,
            id_user,
        });
        res.status(201).json({ message: "Commande ajoutée", order });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getMaxQuoteNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxOrder = yield order_1.default.findOne({
            attributes: ["quote_number"],
            order: [["quote_number", "DESC"]],
        });
        const maxQuoteNumber = maxOrder === null || maxOrder === void 0 ? void 0 : maxOrder.quote_number;
        if (!maxOrder) {
            res.status(404).json({ message: "Aucune commande n'a été trouvée" });
            return;
        }
        res.status(200).json({ maxQuoteNumber });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMaxQuoteNumber = getMaxQuoteNumber;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll();
        const ordersWithClientNames = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            const client = yield (0, clientController_1.getClientName)(order.id_client);
            return Object.assign(Object.assign({}, order.toJSON()), { client_name: client ? client.name : "" });
        })));
        const ordersWithUserNames = yield Promise.all(ordersWithClientNames.map((orderNames) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield (0, userController_1.getUserName)(orderNames.id_user);
            return Object.assign(Object.assign({}, orderNames), { user_name: user ? user.name : "" });
        })));
        const OrdersWithContactNames = yield Promise.all(ordersWithUserNames.map((orderNames) => __awaiter(void 0, void 0, void 0, function* () {
            const contact = yield (0, contactController_1.getContactName)(orderNames.id_contact);
            return Object.assign(Object.assign({}, orderNames), { contact_name: contact ? contact : "" });
        })));
        // Sort OrdersWithContactNames by quote_number
        OrdersWithContactNames.sort((a, b) => a.quote_number - b.quote_number);
        res.status(200).json(OrdersWithContactNames);
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
const getOrdersByIdClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getOrdersByIdClient = getOrdersByIdClient;
const validateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order, validated } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        order.validated = validated;
        yield order.save();
        res.status(200).json({ message: "Commande validée" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.validateOrder = validateOrder;
const editOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order, id_client, site_name, ordered_at, deposit_rate, site_address, comment, reference, id_user, object, } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        order.id_client = id_client;
        order.site_name = site_name;
        order.ordered_at = ordered_at;
        order.deposit_rate = deposit_rate;
        order.site_address = site_address;
        order.comment = comment;
        order.reference = reference;
        order.id_user = id_user;
        order.object = object;
        yield order.save();
        res.status(200).json({ message: "Commande modifiée" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editOrderById = editOrderById;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_1.default.findByPk(id);
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
exports.getOrderById = getOrderById;
const setBilled = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order, validated } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        else if (order.validated === true) {
            res.status(400).json({ message: "La commande est déjà validée" });
            return;
        }
        order.validated = validated;
        yield order.save();
        res.status(200).json({ message: "Commande mise à jour" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.setBilled = setBilled;
const setPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_order } = req.body;
        const order = yield order_1.default.findByPk(id_order);
        if (!order) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        else if (order.validated === false) {
            res.status(400).json({ message: "La commande n'est pas validée" });
            return;
        }
        else if (order.paid === true) {
            res.status(400).json({ message: "La commande est déjà payée" });
            return;
        }
        else if (order.billed === false) {
            res.status(400).json({ message: "La commande n'est pas facturée" });
            return;
        }
        order.paid = !order.paid;
        yield order.save();
        res.status(200).json({ message: "Commande mise à jour" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.setPaid = setPaid;
