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
import pressMentionRoutes from "./routes/pressMentionRoutes";
import projectRoutes from "./routes/projectRoutes";
import projectTypeRoutes from "./routes/projectTypeRoutes";
import projectImageRoutes from "./routes/projectImageRoutes";
import sequelize from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:4000",
  "https://ats-serrurerie.com",
  "http://ats-metallerie-serrurerie.fr",
  "http://127.0.0.1:5501",
  "http://localhost:8888",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
app.use("/api/pressMentions", pressMentionRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projectTypes", projectTypeRoutes);
app.use("/api/projectImages", projectImageRoutes);

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
