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
exports.getByIdWelder = exports.getOrderbyPk = exports.getAll = exports.setAchieved = exports.editPriority = exports.add = void 0;
const workshopPlanning_1 = __importDefault(require("../model/workshopPlanning"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product, id_welder, priority } = req.body;
        const workshopPlanningItems = yield workshopPlanning_1.default.findAll({
            where: {
                id_welder: id_welder,
                priority: {
                    [sequelize_1.Op.gte]: priority,
                },
            },
        });
        if (workshopPlanningItems.length > 0) {
            for (let i = 0; i < workshopPlanningItems.length; i++) {
                workshopPlanningItems[i].priority = workshopPlanningItems[i].priority + 1;
                yield workshopPlanningItems[i].save();
            }
        }
        const workshopPlanning = yield workshopPlanning_1.default.create({ id_product, id_welder, priority });
        res.status(201).json({ message: "Ajouté au planning", workshopPlanning, workshopPlanningItems });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.add = add;
const editPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_workshop_planning, id_welder, newPriority } = req.body;
        const workshopPlanning = yield workshopPlanning_1.default.findByPk(id_workshop_planning);
        if (id_welder != (workshopPlanning === null || workshopPlanning === void 0 ? void 0 : workshopPlanning.id_welder)) {
            res.status(409).json({ message: "La tache ne correspond pas à la personne spécifiée" });
            return;
        }
        if (workshopPlanning) {
            if (workshopPlanning.priority > newPriority) {
                const workshopPlanningItems = yield workshopPlanning_1.default.findAll({
                    where: {
                        id_welder: id_welder,
                        priority: {
                            [sequelize_1.Op.lt]: workshopPlanning.priority,
                            [sequelize_1.Op.gte]: newPriority,
                        },
                    },
                });
                if (workshopPlanningItems.length > 0) {
                    for (let i = 0; i < workshopPlanningItems.length; i++) {
                        workshopPlanningItems[i].priority = workshopPlanningItems[i].priority + 1;
                        yield workshopPlanningItems[i].save();
                    }
                }
                workshopPlanning.priority = newPriority;
                workshopPlanning.save();
                res.status(200).json({ message: "Planning mit à jour" });
                return;
            }
            else if (workshopPlanning.priority < newPriority) {
                const workshopPlanningItems = yield workshopPlanning_1.default.findAll({
                    where: {
                        id_welder: id_welder,
                        priority: {
                            [sequelize_1.Op.gt]: workshopPlanning.priority,
                            [sequelize_1.Op.lte]: newPriority,
                        },
                    },
                });
                if (workshopPlanningItems.length > 0) {
                    for (let i = 0; i < workshopPlanningItems.length; i++) {
                        workshopPlanningItems[i].priority = workshopPlanningItems[i].priority - 1;
                        yield workshopPlanningItems[i].save();
                    }
                }
                workshopPlanning.priority = newPriority;
                workshopPlanning.save();
                res.status(200).json({ message: "Planning mit à jour" });
                return;
            }
            else if (workshopPlanning.priority === newPriority) {
                res.status(409).json({ message: "La priorité est la même" });
                return;
            }
        }
        else {
            res.status(404).json({ message: "Cette tache n'a pas été plannifiée" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.editPriority = editPriority;
const setAchieved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_workshop_planning, id_welder, priority } = req.body;
        const workshopPlanning = yield workshopPlanning_1.default.findByPk(id_workshop_planning);
        const workshopPlanningItems = yield workshopPlanning_1.default.findAll({
            where: {
                id_welder: id_welder,
                priority: {
                    [sequelize_1.Op.gt]: priority,
                },
            },
        });
        if (workshopPlanning) {
            workshopPlanning.priority = 0;
            workshopPlanning.achieved_at = new Date();
            workshopPlanning.save();
            if (workshopPlanningItems.length > 0) {
                for (let i = 0; i < workshopPlanningItems.length; i++) {
                    workshopPlanningItems[i].priority = workshopPlanningItems[i].priority - 1;
                    yield workshopPlanningItems[i].save();
                }
            }
            //Modifier Statut
            res.status(200).json({ messge: "Tache achevée" });
        }
        else {
            res.status(404).json({ message: "Cette tache n'a pas été plannifiée" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.setAchieved = setAchieved;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workshopPlannings = yield workshopPlanning_1.default.findAll();
        if (workshopPlannings.length === 0) {
            res.status(404).json({ message: "Aucune Commande à ce jour" });
            return;
        }
        res.status(200).json({ workshopPlannings });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAll = getAll;
const getOrderbyPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_workshop_plannings } = req.body;
        const workshopPlanning = yield workshopPlanning_1.default.findByPk(id_workshop_plannings);
        if (!workshopPlanning) {
            res.status(404).json({ message: "Commande inconnue" });
            return;
        }
        res.status(200).json({ workshopPlanning });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderbyPk = getOrderbyPk;
const getByIdWelder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_welder } = req.body;
        const workshopPlanningItems = yield workshopPlanning_1.default.findAll({ where: { id_welder } });
        if (!workshopPlanningItems) {
            res.status(404).json({ message: "Aucun" });
            return;
        }
        res.status(200).json({ workshopPlanningItems });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getByIdWelder = getByIdWelder;
