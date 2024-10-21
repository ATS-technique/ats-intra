"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Order extends sequelize_1.Model {
}
Order.init({
    id_order: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_client: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    site_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ordered_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    validated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    id_deposit: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: true,
    },
    site_address: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "order_details",
});
exports.default = Order;
