"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ServiceLine extends sequelize_1.Model {
}
ServiceLine.init({
    id_service_line: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_product: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    id_service: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "service_lines",
});
exports.default = ServiceLine;
