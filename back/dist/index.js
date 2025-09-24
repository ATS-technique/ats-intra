"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const workshopPlanningRoutes_1 = __importDefault(require("./routes/workshopPlanningRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const pressMentionRoutes_1 = __importDefault(require("./routes/pressMentionRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const projectTypeRoutes_1 = __importDefault(require("./routes/projectTypeRoutes"));
const projectImageRoutes_1 = __importDefault(require("./routes/projectImageRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const normalize = (u) => {
    try {
        const url = new URL(u);
        return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
    }
    catch (_a) {
        return u.replace(/\/$/, "");
    }
};
const rawAllowed = [
    process.env.FRONTEND_URL,
    process.env.WEBSITE_URL || "https://ats-serrurerie.com",
    process.env.WEBSITE_BIS_URL || "https://ats-metallerie-serrurerie.fr",
    "http://localhost:8888",
    "https://ats-serrurerie.com",
    "https://www.ats-serrurerie.com",
].filter(Boolean);
const ALLOWED = new Set(rawAllowed.map(normalize));
const corsOptions = {
    origin(origin, callback) {
        // Requêtes sans Origin (curl / serveur->serveur)
        if (!origin)
            return callback(null, true);
        const o = normalize(origin);
        if (ALLOWED.has(o))
            return callback(null, true);
        // (facultatif) logique sous-domaines
        try {
            const u = new URL(origin);
            if (u.protocol === "https:" &&
                (u.hostname === "ats-serrurerie.com" || u.hostname.endsWith(".ats-serrurerie.com"))) {
                return callback(null, true);
            }
        }
        catch (_a) { }
        return callback(new Error("Not allowed by CORS : " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((req, res, next) => { res.header("Vary", "Origin"); next(); });
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/clients", clientRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/workshopPlanning", workshopPlanningRoutes_1.default);
app.use("/api/articles", articleRoutes_1.default);
app.use("/api/contacts", contactRoutes_1.default);
app.use("/api/tags", tagRoutes_1.default);
app.use("/api/pressMentions", pressMentionRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/projectTypes", projectTypeRoutes_1.default);
app.use("/api/projectImages", projectImageRoutes_1.default);
db_1.default
    .sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log("Error connecting to the database:", error);
});
