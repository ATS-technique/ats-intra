"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    id_contact: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_client: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    landline: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    mobile: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "contacts",
});
exports.default = Contact;
