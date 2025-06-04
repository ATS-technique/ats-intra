"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Client extends sequelize_1.Model {
}
Client.init({
    id_client: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pro: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    tel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    post_code: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    siren: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "clients",
});
exports.default = Client;
