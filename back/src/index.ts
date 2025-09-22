import express from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
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

type OriginCb = (err: Error | null, allow?: boolean) => void;

const normalize = (u: string): string => {
  try {
    const url = new URL(u);
    return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
  } catch {
    return u.replace(/\/$/, "");
  }
};

const rawAllowed = [
  process.env.FRONTEND_URL || "http://localhost:4000",
  process.env.WEBSITE_URL || "https://ats-serrurerie.com",
  process.env.WEBSITE_BIS_URL || "https://ats-metallerie-serrurerie.fr",
  "http://127.0.0.1:5501",
  "http://localhost:8888",
  "https://ats-serrurerie.com",
  "https://www.ats-serrurerie.com",
].filter(Boolean) as string[];

const ALLOWED = new Set(rawAllowed.map(normalize));

const corsOptions: CorsOptions = {
  origin(origin: string | undefined, callback: OriginCb) {
    // Requêtes sans Origin (curl / serveur->serveur)
    if (!origin) return callback(null, true);

    const o = normalize(origin);
    if (ALLOWED.has(o)) return callback(null, true);

    // (facultatif) logique sous-domaines
    try {
      const u = new URL(origin);
      if (
        u.protocol === "https:" &&
        (u.hostname === "ats-serrurerie.com" || u.hostname.endsWith(".ats-serrurerie.com"))
      ) {
        return callback(null, true);
      }
    } catch {}

    return callback(new Error("Not allowed by CORS : " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use((req, res, next) => { res.header("Vary", "Origin"); next(); });
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


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
