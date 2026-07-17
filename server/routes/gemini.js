import express from "express";
import { improveText } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/", improveText);

export default router;
