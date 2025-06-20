"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../model/user")); // Assurez-vous que le chemin est correct
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT || "8889", 10),
    define: {
        timestamps: true,
        underscored: true,
    },
});
function createAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminMail = process.env.ADMIN_MAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;
            const adminName = process.env.ADMIN_NAME;
            const existingAdmin = yield user_1.default.findOne({ where: { mail: adminMail } });
            if (!existingAdmin && adminMail && adminPassword && adminName) {
                const hashedPassword = yield bcrypt_1.default.hash(adminPassword, 10);
                yield user_1.default.create({
                    name: adminName,
                    mail: adminMail,
                    password: hashedPassword,
                    is_active: true,
                });
                console.log("Compte administrateur créé :", adminMail);
            }
        }
        catch (err) {
            console.error("Erreur lors de la création du compte admin :", err);
        }
    });
}
// Synchronisation et création admin
sequelize.sync().then(() => {
    createAdminUser();
});
exports.default = sequelize;
