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
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:4000",
}));
app.use(body_parser_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/clients", clientRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
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
