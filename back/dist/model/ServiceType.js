"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ServiceType extends sequelize_1.Model {
}
ServiceType.init({
    id_service_type: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    coeff: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "service_types",
});
exports.default = ServiceType;
