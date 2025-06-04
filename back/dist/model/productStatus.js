"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ProductStatus extends sequelize_1.Model {
}
ProductStatus.init({
    id_product_status: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "product_status",
});
exports.default = ProductStatus;
