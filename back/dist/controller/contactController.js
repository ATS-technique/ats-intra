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
exports.getContactsByIdClient = exports.getContactbyPk = exports.getContactName = exports.getAll = exports.add = void 0;
const contact_1 = __importDefault(require("../model/contact"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_client, name, mail, mobile, landline } = req.body;
        const contact = yield contact_1.default.create({ id_client, name, mail, mobile, landline });
        res.status(201).json({ message: "Contact ajoutée", contact });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contact_1.default.findAll();
        if (contacts.length === 0) {
            res.status(404).json({ message: "Aucun produit à ce jour" });
            return;
        }
        res.status(200).json({ contacts });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getContactName = (id_contact) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield contact_1.default.findByPk(id_contact);
        if (!contact) {
            return null;
        }
        return contact.name;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getContactName = getContactName;
const getContactbyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_contact } = req.body;
        const contact = yield contact_1.default.findByPk(id_contact);
        if (!contact) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ contact });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getContactbyPk = getContactbyPk;
const getContactsByIdClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_client } = req.params;
        console.log(" id_client", id_client);
        const contacts = yield contact_1.default.findAll({ where: { id_client } });
        if (!contacts) {
            res.status(404).json({ message: " Aucun contact pour ce client" });
            return;
        }
        res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getContactsByIdClient = getContactsByIdClient;
