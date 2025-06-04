"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ArticleTags extends sequelize_1.Model {
}
ArticleTags.init({
    id_article: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_tag: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "articles_tags",
});
exports.default = ArticleTags;
