import { apiRequest } from "./api";

const generateNotes = async (documentId, token) => {
    return apiRequest(
        `/notes/generate/${documentId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

const getNotes = async (token) => {
    return apiRequest(
        "/notes",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

const getNote = async (noteId, token) => {
    return apiRequest(
        `/notes/${noteId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

const deleteNote = async (noteId, token) => {
    return apiRequest(
        `/notes/${noteId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export {
    generateNotes,
    getNotes,
    getNote,
    deleteNote
};