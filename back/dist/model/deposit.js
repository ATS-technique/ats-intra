"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Deposit extends sequelize_1.Model {
}
Deposit.init({
    id_deposit: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    rate: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    }
}, {
    sequelize: db_1.default,
    tableName: "deposits",
});
exports.default = Deposit;
