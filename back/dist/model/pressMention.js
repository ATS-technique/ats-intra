"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class PressMention extends sequelize_1.Model {
}
PressMention.init({
    id_press_mention: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    media_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    article_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    article_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    link_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "press_mentions",
});
exports.default = PressMention;
