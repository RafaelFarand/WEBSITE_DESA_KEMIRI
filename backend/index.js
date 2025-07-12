import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pendudukRoutes from "./routes/pendudukRoute.js";
import strukturalRoutes from "./routes/strukturalRoute.js";
import potensiWisataRoutes from "./routes/potensiWisataRoute.js";
import potensiKomoditasRoutes from "./routes/potensiKomoditasRoute.js";
import association from "./config/assoc.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/penduduk", pendudukRoutes);
app.use("/api/struktural", strukturalRoutes);
app.use("/api/potensi-wisata", potensiWisataRoutes);
app.use("/api/potensi-komoditas", potensiKomoditasRoutes);


app.get("/", (req, res) => {
  res.send("Backend Desa Kemiri");
});

// Start
const startServer = async () => {
  try {
    await association();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
