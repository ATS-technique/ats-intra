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
exports.activateArticle = exports.editArticle = exports.getAll = exports.getArticle = exports.add = void 0;
const article_1 = __importDefault(require("../model/article"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageMangement_1 = __importDefault(require("../function/imageMangement"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            throw new Error("Aucun fichier reçu");
        const isNameTaken = yield checkArticleNameExist(req.body.title);
        if (isNameTaken) {
            res.status(409).json({ message: "Un article porte deja ce nom" });
            return;
        }
        const { title, description } = req.body;
        // Chemin Cloudinary
        const folderPath = `articles/${title}`;
        // Upload Cloudinary
        const image = yield (0, imageMangement_1.default)(req.file, folderPath);
        // Création de l'article avec l'URL Cloudinary
        const newObject = yield article_1.default.create({ title, image, description });
        const article = newObject.dataValues;
        res.status(201).json({ article });
    }
    catch (error) {
        console.error("❌ Erreur création article :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_article } = req.body;
        const article = yield article_1.default.findByPk(id_article);
        if (!article) {
            res.status(404).json({ message: "Article inconnue" });
            return;
        }
        res.status(200).json({ article });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getArticle = getArticle;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.findAll();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const checkArticleNameExist = (articleName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield article_1.default.findOne({ where: { title: articleName } });
        if (article) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Erreur lors de la vérification de l'existence de l'article :", error);
        throw new Error("Erreur lors de la vérification de l'existence de l'article");
    }
});
const editArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_article, title, image, description } = req.body;
        const article = yield article_1.default.findByPk(id_article);
        if (!article) {
            res.status(404).json({ message: "Article non trouvé" });
            return;
        }
        else {
            article.title = title;
            article.image = image;
            article.description = description;
            yield article.save();
            res.status(200).json({ message: "Champ modifié", article });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editArticle = editArticle;
const activateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_article } = req.body;
        const article = yield article_1.default.findByPk(id_article);
        if (!article) {
            res.status(404).json({ message: "Article non trouvé" });
            return;
        }
        article.visible = true;
        yield article.save();
        res.status(200).json({ message: "Article activé", article });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.activateArticle = activateArticle;
