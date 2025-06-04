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
    quote_number: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        unique: true,
    },
    site_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0,
    },
    ordered_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    object: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    validated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    billed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    billing_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    payement_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    id_contact: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
    },
    deposit_rate: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0,
    },
    deposit_paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    site_address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "order_details",
});
exports.default = Order;
