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
exports.getProjectTypeWithCoverImage = exports.getProjectTypebyPk = exports.getAll = exports.add = void 0;
exports.getProjectTypeById = getProjectTypeById;
const projectType_1 = __importDefault(require("../model/projectType"));
const dotenv_1 = __importDefault(require("dotenv"));
const projectController_1 = require("./projectController");
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const projectType = yield projectType_1.default.create({ name });
        res.status(201).json({ message: "Type de projet ajouté", projectType });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectTypes = yield projectType_1.default.findAll();
        if (projectTypes.length === 0) {
            res.status(404).json({ message: "Aucun type de projet à ce jour" });
            return;
        }
        res.status(200).json(projectTypes);
    }
    catch (error) {
        console.log("❌ Erreur lors de la récupération des types de projet :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getProjectTypebyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project_type } = req.body;
        const projectType = yield projectType_1.default.findOne({ where: { id_project_type: id_project_type } });
        if (!projectType) {
            res.status(404).json({ message: "Type de projet inconnu" });
            return;
        }
        res.status(200).json(projectType);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectTypebyPk = getProjectTypebyPk;
function getProjectTypeById(id_project_type) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectType = yield projectType_1.default.findOne({ where: { id_project_type: id_project_type } });
        return projectType ? projectType.name : null;
    });
}
const getProjectTypeWithCoverImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectTypes = yield projectType_1.default.findAll();
        if (projectTypes.length === 0) {
            res.status(404).json({ message: "Aucun type de projet à ce jour" });
            return;
        }
        const slideData = yield Promise.all(projectTypes.map((projectType) => __awaiter(void 0, void 0, void 0, function* () {
            const coverImage = yield (0, projectController_1.getLatestCoverImageByProjectType)(projectType.id_project_type);
            if (!coverImage)
                return null; // on neutralise si pas d'image
            return {
                image: coverImage,
                title: projectType.name,
                id_project_type: projectType.id_project_type,
            };
        }))).then(arr => arr.filter((x) => x !== null)); // on filtre les nulls
        res.status(200).json(slideData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectTypeWithCoverImage = getProjectTypeWithCoverImage;
