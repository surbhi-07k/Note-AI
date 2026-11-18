import {
    generateAndSaveNotes,
    getUserNotes,
    getNoteById,
    deleteNote
} from "../services/noteService.js";


const generateNotes = async (
    req,
    res,
    next
) => {
    try {
        const note =
            await generateAndSaveNotes({
                documentId:
                    req.params.documentId,

                userId:
                    req.user.userId
            });

        return res.status(201).json({
            success: true,

            message:
                "AI notes generated successfully",

            data: {
                note
            }
        });

    } catch (error) {
        next(error);
    }
};


const getNotes = async (
    req,
    res,
    next
) => {
    try {
        const notes =
            await getUserNotes(
                req.user.userId
            );

        return res.status(200).json({
            success: true,

            data: {
                notes
            }
        });

    } catch (error) {
        next(error);
    }
};


const getNote = async (
    req,
    res,
    next
) => {
    try {
        const note =
            await getNoteById({
                noteId:
                    req.params.id,

                userId:
                    req.user.userId
            });

        return res.status(200).json({
            success: true,

            data: {
                note
            }
        });

    } catch (error) {
        next(error);
    }
};


const removeNote = async (
    req,
    res,
    next
) => {
    try {
        await deleteNote({
            noteId:
                req.params.id,

            userId:
                req.user.userId
        });

        return res.status(200).json({
            success: true,

            message:
                "Note deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


export {
    generateNotes,
    getNotes,
    getNote,
    removeNote
};