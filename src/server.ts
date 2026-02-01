import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productsRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import cartRoutes from "./routes/cartRoutes";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/ordersRoutes";
import UploadRoutes from "./routes/uploadRoutes";
import adminRoutes from "./routes/adminRoutes";
import path from "path";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const MONGO_URL: string = process.env.MONGO_URL || "mongodb+srv://admin:DfET6Bc.Zyc9cLv@cluster12.etcfeji.mongodb.net/?appName=Cluster12";
const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    // cSpell:ignore topbar
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Product API Docs",
  }),
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(" Connected to MongoDB Compass"))
  .catch((err) => console.error(" Connection error:", err));
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
