import { PDFParse } from "pdf-parse";
import Document from "../models/Document.js";

const createDocument = async ({
    userId,
    file
}) => {
    const document = await Document.create({
        user: userId,
        title: file.originalname.replace(
            /\.pdf$/i,
            ""
        ),
        originalFileName: file.originalname,
        fileSize: file.size,
        status: "processing"
    });

    try {
        const parser = new PDFParse({
            data: file.buffer
        });

        const result =
            await parser.getText();

        const extractedText =
            result.text.trim();

        document.extractedText =
            extractedText;

        document.status =
            "completed";

        await document.save();

        await parser.destroy();

        return document;
    } catch (error) {
        document.status = "failed";

        await document.save();

        throw error;
    }
};

const getUserDocuments = async (
    userId
) => {
    return Document.find({
        user: userId
    })
        .select("-extractedText")
        .sort({
            createdAt: -1
        });
};

const getDocumentById = async ({
    documentId,
    userId
}) => {
    const document =
        await Document.findOne({
            _id: documentId,
            user: userId
        });

    if (!document) {
        const error = new Error(
            "Document not found"
        );

        error.statusCode = 404;

        throw error;
    }

    return document;
};

const deleteDocument = async ({
    documentId,
    userId
}) => {
    const document =
        await Document.findOneAndDelete({
            _id: documentId,
            user: userId
        });

    if (!document) {
        const error = new Error(
            "Document not found"
        );

        error.statusCode = 404;

        throw error;
    }

    return document;
};

export {
    createDocument,
    getUserDocuments,
    getDocumentById,
    deleteDocument
};