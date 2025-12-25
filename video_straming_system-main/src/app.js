import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/v1", router);

app.get("/health", (req, res) => {
  res.status(200);
  res.json({
    message: "backend is working fine...",
  });
});

// if no route is matched by now, it must be a 404
app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
