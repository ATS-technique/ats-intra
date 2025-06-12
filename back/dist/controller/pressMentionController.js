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
exports.editPressMention = exports.getAll = exports.getpressMention = exports.add = void 0;
const pressMention_1 = __importDefault(require("../model/pressMention"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageMangement_1 = __importDefault(require("../function/imageMangement"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            throw new Error("Aucun fichier reçu");
        const { article_name, media_name, article_url, link_text, image_path } = req.body;
        const folderPath = `pressMentions/${article_name}`;
        // Upload Cloudinary
        const image = yield (0, imageMangement_1.default)(req.file, folderPath);
        // Création de l'article avec l'URL Cloudinary
        const newObject = yield pressMention_1.default.create({ article_name, media_name, article_url, link_text, image_path: image });
        const pressMention = newObject.dataValues;
        res.status(201).json({ pressMention });
    }
    catch (error) {
        console.error("❌ Erreur création article :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getpressMention = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_press_mention } = req.body;
        const pressMention = yield pressMention_1.default.findByPk(id_press_mention);
        if (!pressMention) {
            res.status(404).json({ message: "Article inconnue" });
            return;
        }
        res.status(200).json({ pressMention });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getpressMention = getpressMention;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pressMentions = yield pressMention_1.default.findAll();
        res.status(200).json(pressMentions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const editPressMention = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_press_mention, media_name, article_name, article_url, link_text, image_path } = req.body;
        const pressMention = yield pressMention_1.default.findByPk(id_press_mention);
        if (!pressMention) {
            res.status(404).json({ message: "Article non trouvé" });
            return;
        }
        else {
            pressMention.media_name = media_name;
            pressMention.article_name = article_name;
            pressMention.article_url = article_url;
            pressMention.link_text = link_text;
            pressMention.image_path = image_path;
            yield pressMention.save();
            res.status(200).json({ message: "Article modifié", pressMention });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editPressMention = editPressMention;
