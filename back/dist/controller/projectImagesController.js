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
exports.addManyImages = exports.deleteProjectImageById = exports.getProjectImageByIdProject = exports.getProjectImagebyPk = exports.getAll = exports.addMany = exports.add = void 0;
const projectImages_1 = __importDefault(require("../model/projectImages"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageMangement_1 = __importDefault(require("../function/imageMangement"));
dotenv_1.default.config();
const sanitize = (name) => name.replace(/[^\w.\-]+/g, "_").toLowerCase();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            throw new Error("Aucun fichier reçu");
        const { id_project } = req.body;
        const folderPath = `projects/${id_project}`;
        // Upload Cloudinary
        const image = yield (0, imageMangement_1.default)(req.file, folderPath);
        const projectImage = yield projectImages_1.default.create({ id_project, path: image });
        res.status(201).json({ message: "Image de projet ajouté", projectImage });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const addMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files || [];
        if (!files.length) {
            res.status(400).json({ error: "Aucun fichier reçu" });
            return;
        }
        const { id_project } = req.body;
        if (!id_project) {
            res.status(400).json({ error: "id_project est requis" });
            return;
        }
        const rows = yield (0, exports.addManyImages)(id_project, files);
        res.status(201).json({
            message: "Images de projet ajoutées",
            count: rows.length,
            images: rows,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addMany = addMany;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectImages = yield projectImages_1.default.findAll();
        if (projectImages.length === 0) {
            res.status(404).json({ message: "Aucune image de projet à ce jour" });
            return;
        }
        res.status(200).json(projectImages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getProjectImagebyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project_image } = req.body;
        const projectImage = yield projectImages_1.default.findByPk(id_project_image);
        if (!projectImage) {
            res.status(404).json({ message: "Image de projet inconnue" });
            return;
        }
        res.status(200).json({ projectImage });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectImagebyPk = getProjectImagebyPk;
const getProjectImageByIdProject = (id_project) => __awaiter(void 0, void 0, void 0, function* () {
    const projectImage = yield projectImages_1.default.findAll({ where: { id_project } });
    if (!projectImage) {
        return null;
    }
    return projectImage;
});
exports.getProjectImageByIdProject = getProjectImageByIdProject;
const deleteProjectImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project_image } = req.body;
        yield projectImages_1.default.destroy({ where: { id_project_image } });
        res.status(200).json({ message: "Image de projet supprimé" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProjectImageById = deleteProjectImageById;
const addManyImages = (id_project, files) => __awaiter(void 0, void 0, void 0, function* () {
    const folderPath = `projects/${id_project}`;
    // 1) uploader chaque fichier
    const uploaded = yield Promise.all(files.map((f, idx) => __awaiter(void 0, void 0, void 0, function* () {
        // dest: dossier + nom horodaté pour éviter les collisions
        const dest = `${folderPath}/${Date.now()}_${idx}_${sanitize(f.originalname)}`;
        const urlOrPath = yield (0, imageMangement_1.default)(f, dest);
        return { id_project, path: urlOrPath, originalname: f.originalname, size: f.size, mimetype: f.mimetype };
    })));
    // 2) créer une entrée en BDD par image
    // Si tu veux toutes les infos, adapte le modèle (ex: originalname, mimetype, size…)
    const rows = yield projectImages_1.default.bulkCreate(uploaded.map(({ id_project, path }) => ({
        id_project: typeof id_project === "string" ? Number(id_project) : id_project,
        path
    })), { returning: true });
    return rows;
});
exports.addManyImages = addManyImages;
