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
exports.editClientById = exports.getAll = exports.getClientName = exports.getClient = exports.add = void 0;
const client_1 = __importDefault(require("../model/client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, pro, tel, mail, address, city, post_code, siren } = req.body;
        const client = yield client_1.default.create({ name, pro, tel, mail, address, city, post_code, siren });
        res.status(201).json({ message: "Client ajouté", client });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_client } = req.body;
        const client = yield client_1.default.findByPk(id_client);
        if (!client) {
            res.status(404).json({ message: "Client inconnue" });
            return;
        }
        res.status(200).json({ client });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getClient = getClient;
const getClientName = (id_client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_1.default.findByPk(id_client);
        if (!client) {
            throw new Error("Client inconnue");
        }
        return client;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getClientName = getClientName;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_1.default.findAll();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const editClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_client, address, city, mail, name, post_code, pro, siren, tel } = req.body;
        const client = yield client_1.default.findByPk(id_client);
        if (!client) {
            res.status(404).json({ message: "Client non trouvé" });
            return;
        }
        else {
            client.address = address;
            client.city = city;
            client.mail = mail;
            client.name = name;
            client.post_code = post_code;
            client.pro = pro;
            client.siren = siren;
            client.tel = tel;
            yield client.save();
            res.status(200).json({ message: "Champ modifié", client });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editClientById = editClientById;
