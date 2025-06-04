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
exports.getArticleTags = exports.add = void 0;
const articlesTags_1 = __importDefault(require("../model/articlesTags"));
const dotenv_1 = __importDefault(require("dotenv"));
const tag_1 = __importDefault(require("../model/tag"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_article, id_tag } = req.body;
        const article_tag = yield articlesTags_1.default.create({ id_article, id_tag });
        res.status(201).json({ message: "Article ajouté", article_tag });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getArticleTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_article } = req.body;
        const article_tags = yield articlesTags_1.default.findAll({ where: { id_article } });
        if (!article_tags) {
            res.status(404).json({ message: "Auncun tag pour cet article" });
            return;
        }
        article_tags.forEach((article_tag) => __awaiter(void 0, void 0, void 0, function* () {
            const tag = yield tag_1.default.findByPk(article_tag.id_tag);
            if (tag) {
                article_tag.name = tag.name;
            }
        }));
        res.status(200).json({ article_tags });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getArticleTags = getArticleTags;
