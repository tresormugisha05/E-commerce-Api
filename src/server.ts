import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productsRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config";
import cartRoutes from "./routes/cartRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL: string =
  "mongodb+srv://admin:DfET6Bc.Zyc9cLv@cluster12.etcfeji.mongodb.net/?appName=Cluster12";
const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Product API Docs",
  })
);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(" Connected to MongoDB Compass"))
  .catch((err) => console.error(" Connection error:", err));
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
// app.get('/', (req, res) => res.send('API is running...'));

// app.use("*",(req, res) => res.status(404).json({ message: "Endpoint not found" }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
