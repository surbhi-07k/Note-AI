import express from "express";

import healthRoutes from "./healthRoutes.js";
import authRoutes from "./authRoutes.js";
import documentRoutes from "./documentRoutes.js";
import noteRoutes from "./noteRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Notes Generator Backend is running"
    });
});

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/documents", documentRoutes);
router.use("/notes", noteRoutes);

export default router;