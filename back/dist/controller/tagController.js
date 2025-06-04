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
exports.editTag = exports.getAll = exports.getTag = exports.getAllTags = exports.add = void 0;
const tag_1 = __importDefault(require("../model/tag"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const tag = yield tag_1.default.create({ name });
        res.status(201).json({ message: "Tag ajouté", tag });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tag_1.default.findAll();
        res.status(200).json(tags);
    }
    catch (error) {
        console.error("❌ Erreur récupération des tags :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTags = getAllTags;
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tag } = req.body;
        const tag = yield tag_1.default.findByPk(id_tag);
        if (!tag) {
            res.status(404).json({ message: "Tag inconnue" });
            return;
        }
        res.status(200).json({ tag });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTag = getTag;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tag_1.default.findAll();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const editTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tag, name } = req.body;
        const tag = yield tag_1.default.findByPk(id_tag);
        if (!tag) {
            res.status(404).json({ message: "Tag non trouvé" });
            return;
        }
        else {
            tag.name = name;
            yield tag.save();
            res.status(200).json({ message: "Tag modifié", tag });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editTag = editTag;
