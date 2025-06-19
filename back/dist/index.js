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
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:4000",
    "https://ats-serrurerie.com",
    "http://ats-mettalerie-serrurerie.fr",
    "http://127.0.0.1:5501",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
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
