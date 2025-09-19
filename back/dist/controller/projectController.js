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
exports.getLatestCoverImageByProjectType = exports.getProjectsDetails = exports.getProjectByType = exports.getProjectbyPk = exports.update = exports.getAll = exports.add = void 0;
const project_1 = __importDefault(require("../model/project"));
const dotenv_1 = __importDefault(require("dotenv"));
const projectTypesController_1 = require("./projectTypesController");
const projectImagesController_1 = require("./projectImagesController");
const imageMangement_1 = __importDefault(require("../function/imageMangement"));
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files)
            throw new Error("Aucun fichier reçu");
        const { id_project_type, name, description } = req.body;
        const folderPath = `projects/${id_project_type}`;
        const filesMap = req.files;
        if (!filesMap.cover_image)
            throw new Error("Aucun fichier reçu");
        const image = yield (0, imageMangement_1.default)(filesMap.cover_image[0], folderPath);
        const project = yield project_1.default.create({ id_project_type, name, description, cover_image: image });
        if (filesMap.images) {
            yield (0, projectImagesController_1.addManyImages)(project.id_project, filesMap.images);
        }
        const projectType = yield (0, projectTypesController_1.getProjectTypeById)(project.id_project_type);
        const projectImages = yield (0, projectImagesController_1.getProjectImageByIdProject)(project.id_project);
        project.projectType = projectType ? projectType : "";
        project.project_images = projectImages ? projectImages.map(img => img) : [];
        res.status(201).json({ message: "Projet ajouté", project });
    }
    catch (error) {
        console.log("🅰️ Error: ", error);
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectsRaw = yield project_1.default.findAll();
        // Si tu veux renvoyer 404 quand c'est vide, ok, mais c'est souvent plus simple de renvoyer 200 + []
        if (!projectsRaw.length) {
            res.status(200).json([]);
            return;
        }
        // 1) Convertir en objets simples
        const projects = projectsRaw.map(p => p.get({ plain: true }));
        const projectsWithTypeAndImages = yield (0, exports.getProjectsDetails)(projects);
        res.status(200).json(projectsWithTypeAndImages);
    }
    catch (error) {
        console.error("❌ Erreur lors de la récupération des projets :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project, name, description, id_project_type } = req.body;
        const project = yield project_1.default.findOne({ where: { id_project } });
        if (!project) {
            res.status(404).json({ message: "Projet inconnu" });
            return;
        }
        project.name = name;
        project.description = description;
        project.id_project_type = id_project_type;
        if (req.file) {
            const folderPath = `projects/${name}`;
            const cover_image = yield (0, imageMangement_1.default)(req.file, folderPath);
            project.cover_image = cover_image;
        }
        yield project.save();
        const projectType = yield (0, projectTypesController_1.getProjectTypeById)(project.id_project_type);
        const projectImages = yield (0, projectImagesController_1.getProjectImageByIdProject)(project.id_project);
        project.projectType = projectType ? projectType : "";
        project.project_images = projectImages ? projectImages.map(img => img) : [];
        res.status(200).json({ message: "Projet modifié", project });
    }
    catch (error) {
        console.error("❌ Erreur lors de la modification du projet :", error);
        res.status(500).json({ error: error.message });
    }
});
exports.update = update;
const getProjectbyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project } = req.body;
        const project = yield project_1.default.findOne({ where: { id_project } });
        if (!project) {
            res.status(404).json({ message: "Projet inconnu" });
            return;
        }
        const projectType = yield (0, projectTypesController_1.getProjectTypeById)(project.id_project_type);
        const images = yield (0, projectImagesController_1.getProjectImageByIdProject)(project.id_project);
        project.projectType = projectType ? projectType : "";
        project.project_images = images ? images.map(img => img) : [];
        res.status(200).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectbyPk = getProjectbyPk;
const getProjectByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_project_type } = req.params;
        const projects = yield project_1.default.findAll({ where: { id_project_type } });
        if (projects.length === 0) {
            res.status(404).json({ message: "Aucun projet pour ce type" });
            return;
        }
        const projectsWithImages = yield Promise.all(projects.map((project) => __awaiter(void 0, void 0, void 0, function* () {
            const plain = project.get({ plain: true }); // important
            const images = yield (0, projectImagesController_1.getProjectImageByIdProject)(plain.id_project);
            return Object.assign(Object.assign({}, plain), { images: images !== null && images !== void 0 ? images : [] });
        })));
        console.log(projectsWithImages[1].images);
        res.status(200).json(projectsWithImages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectByType = getProjectByType;
const getProjectsDetails = (projects) => __awaiter(void 0, void 0, void 0, function* () {
    const projectsWithType = yield Promise.all(projects.map((project) => __awaiter(void 0, void 0, void 0, function* () {
        const projectType = yield (0, projectTypesController_1.getProjectTypeById)(project.id_project_type);
        return Object.assign(Object.assign({}, project), { project_type: projectType !== null && projectType !== void 0 ? projectType : null });
    })));
    // 3) Joindre les images
    const projectsWithTypeAndImages = yield Promise.all(projectsWithType.map((project) => __awaiter(void 0, void 0, void 0, function* () {
        const projectImages = yield (0, projectImagesController_1.getProjectImageByIdProject)(project.id_project);
        return Object.assign(Object.assign({}, project), { project_images: projectImages !== null && projectImages !== void 0 ? projectImages : [] });
    })));
    return projectsWithTypeAndImages;
});
exports.getProjectsDetails = getProjectsDetails;
const getLatestCoverImageByProjectType = (id_project_type) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findOne({
        where: { id_project_type },
        order: [['createdAt', 'DESC']], // ou ['created_at', 'DESC'] selon ton champ
    });
    if (!project) {
        return null;
    }
    return project.cover_image ? project.cover_image : null;
});
exports.getLatestCoverImageByProjectType = getLatestCoverImageByProjectType;
