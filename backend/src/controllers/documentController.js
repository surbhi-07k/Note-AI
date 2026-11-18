import {
    createDocument,
    getUserDocuments,
    getDocumentById,
    deleteDocument
} from "../services/documentService.js";

const uploadDocument = async (
    req,
    res,
    next
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:
                    "Please upload a PDF file"
            });
        }

        const document =
            await createDocument({
                userId: req.user.userId,
                file: req.file
            });

        return res.status(201).json({
            success: true,
            message:
                "PDF uploaded and processed successfully",
            data: {
                document
            }
        });
    } catch (error) {
        next(error);
    }
};

const getDocuments = async (
    req,
    res,
    next
) => {
    try {
        const documents =
            await getUserDocuments(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            data: {
                documents
            }
        });
    } catch (error) {
        next(error);
    }
};

const getDocument = async (
    req,
    res,
    next
) => {
    try {
        const document =
            await getDocumentById({
                documentId:
                    req.params.id,
                userId:
                    req.user.userId
            });

        return res.status(200).json({
            success: true,
            data: {
                document
            }
        });
    } catch (error) {
        next(error);
    }
};

const removeDocument = async (
    req,
    res,
    next
) => {
    try {
        await deleteDocument({
            documentId:
                req.params.id,
            userId:
                req.user.userId
        });

        return res.status(200).json({
            success: true,
            message:
                "Document deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    uploadDocument,
    getDocuments,
    getDocument,
    removeDocument
};