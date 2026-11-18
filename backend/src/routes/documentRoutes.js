import express from "express";

import {
    uploadDocument,
    getDocuments,
    getDocument,
    removeDocument
} from "../controllers/documentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(
    authMiddleware
);

router.post(
    "/upload",
    upload.single("file"),
    uploadDocument
);

router.get(
    "/",
    getDocuments
);

router.get(
    "/:id",
    getDocument
);

router.delete(
    "/:id",
    removeDocument
);

export default router;