import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "DocCraft AI Backend" });
});

app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
