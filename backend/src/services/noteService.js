import Document from "../models/Document.js";
import Note from "../models/Note.js";
import { generateNotesWithAI } from "./aiService.js";

const generateAndSaveNotes = async ({ documentId, userId }) => {
    const document = await Document.findOne({
        _id: documentId,
        user: userId
    });

    if (!document) {
        const error = new Error("Document not found");
        error.statusCode = 404;
        throw error;
    }

    if (!document.extractedText?.trim()) {
        const error = new Error(
            "No extracted text found in this document"
        );
        error.statusCode = 400;
        throw error;
    }

    const existingNote = await Note.findOne({
        document: documentId,
        user: userId
    });

    if (existingNote) {
        return existingNote;
    }

    console.log("Sending PDF text to AI service...");

    const aiResult = await generateNotesWithAI(
        document.extractedText
    );

    if (!aiResult) {
        const error = new Error(
            "AI did not return any notes"
        );
        error.statusCode = 502;
        throw error;
    }

    console.log("AI notes received successfully.");

    const note = await Note.create({
        user: userId,
        document: documentId,
        title: `${document.title} - AI Notes`,
        summary: aiResult.summary || "",
        keyPoints: Array.isArray(aiResult.key_points)
            ? aiResult.key_points
            : [],
        content: aiResult.content || ""
    });

    console.log("AI notes saved to MongoDB.");

    return note;
};

const getUserNotes = async (userId) => {
    return Note.find({
        user: userId
    })
        .populate(
            "document",
            "title originalFileName"
        )
        .sort({
            createdAt: -1
        });
};

const getNoteById = async ({ noteId, userId }) => {
    const note = await Note.findOne({
        _id: noteId,
        user: userId
    }).populate(
        "document",
        "title originalFileName"
    );

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    return note;
};

const deleteNote = async ({ noteId, userId }) => {
    const note = await Note.findOneAndDelete({
        _id: noteId,
        user: userId
    });

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    return note;
};

export {
    generateAndSaveNotes,
    getUserNotes,
    getNoteById,
    deleteNote
};