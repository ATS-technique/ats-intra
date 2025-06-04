import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import workshopPlanningRoutes from "./routes/workshopPlanningRoutes";
import contactRoutes from "./routes/contactRoutes";
import articleRoutes from "./routes/articleRoutes";
import tagRoutes from "./routes/tagRoutes";
import sequelize from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4000";

app.use(
  cors({
    origin: FRONTEND_URL,
  }),
  cors({
    origin: "https://ats-serrurerie.com",
  }),
  cors({
    origin: "http://ats-mettalerie-serrurerie.com",
  }),
);

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/workshopPlanning", workshopPlanningRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/tags", tagRoutes);
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log("Error connecting to the database:", error);
  });
