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
exports.getAllUsers = exports.updateUser = exports.updatePasswordForce = exports.updatePassword = exports.upsateScreenMode = exports.deactivate = exports.activate = exports.getUserName = exports.getProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mail, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({ name, mail, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password } = req.body;
        const user = yield user_1.default.findOne({ where: { mail } });
        if (!user) {
            res.status(400).json({ message: "Identifiants incorrects" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Identifiants incorrects" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte à été désactivé" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: "10h" });
        res.status(200).json({ message: "Connexion réussie", token, user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.user.id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProfile = getProfile;
const getUserName = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(id_user);
        if (!user) {
            throw new Error("Client inconnue");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getUserName = getUserName;
const activate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === true) {
            res.status(400).json({ message: "Ce compte est déja actif" });
            return;
        }
        user.is_active = true;
        yield user.save();
        res.status(200).json({ message: "Le compte a été réactivé" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.activate = activate;
const deactivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte à déja été désactivé" });
            return;
        }
        user.is_active = false;
        yield user.save();
        res.status(200).json({ message: "Le compte a été désactivé" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deactivate = deactivate;
const upsateScreenMode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, screenMode } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte est désactivé" });
            return;
        }
        user.is_dark = screenMode;
        yield user.save();
        res.status(200).json({ message: "Affichage modifié" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.upsateScreenMode = upsateScreenMode;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword, oldPassword, id } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte à été désactivé, réactivez le pour le modifier" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (isMatch) {
            user.password = yield bcrypt_1.default.hash(newPassword, 10);
            yield user.save();
            res.status(200).json({ message: "Mot de passe mit à jour" });
            return;
        }
        else {
            res.status(400).json({ message: "Ancien mot de passe incorrect" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updatePassword = updatePassword;
const updatePasswordForce = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passwordUpdated, id } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte à été désactivé, réactivez le pour le modifier" });
            return;
        }
        user.password = yield bcrypt_1.default.hash(passwordUpdated, 10);
        yield user.save();
        res.status(200).json({ message: "Mot de passe mit à jour" });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updatePasswordForce = updatePasswordForce;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nameUpdated, mailUpdated } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur inconnue" });
            return;
        }
        else if (user.is_active === false) {
            res.status(400).json({ message: "Ce compte à été désactivé, réactivez le pour le modifier" });
            return;
        }
        user.name = nameUpdated;
        user.mail = mailUpdated;
        yield user.save();
        res.status(200).json({ message: "Informations mise à jour" });
        return;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
