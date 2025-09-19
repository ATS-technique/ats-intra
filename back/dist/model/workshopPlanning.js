"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class WorkshopPlanning extends sequelize_1.Model {
}
WorkshopPlanning.init({
    id_workshop_planning: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_welder: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    achieved_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "workshop_planning",
});
exports.default = WorkshopPlanning;
