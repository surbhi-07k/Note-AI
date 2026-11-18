import express from "express";

import {
    generateNotes,
    getNotes,
    getNote,
    removeNote
} from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.use(
    authMiddleware
);


router.post(
    "/generate/:documentId",
    generateNotes
);


router.get(
    "/",
    getNotes
);


router.get(
    "/:id",
    getNote
);


router.delete(
    "/:id",
    removeNote
);


export default router;