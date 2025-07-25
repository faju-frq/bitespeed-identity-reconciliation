import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import identifyRoutes from "./routes/identify.route";
import { sequelize } from "./config/database.config";

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, "../public")));

app.use("/identify", identifyRoutes);

//Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Bitespeed Identity Reconciliation Service",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bitespeed Identity Reconciliation Service",
    version: "1.0.0",
    endpoints: {
      identify: "POST /api/identify",
      health: "GET /health",
    },
  });
});

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected and models synced.");
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(
      `Identify endpoint: POST http://localhost:${PORT}/api/identify`
    );
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});
