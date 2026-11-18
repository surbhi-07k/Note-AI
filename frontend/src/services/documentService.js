import { apiRequest } from "./api";

const uploadDocument = async (file, token) => {
    const formData = new FormData();

    formData.append("file", file);

    return apiRequest("/documents/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
};

const getDocuments = async (token) => {
    return apiRequest("/documents", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getDocument = async (documentId, token) => {
    return apiRequest(`/documents/${documentId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const deleteDocument = async (documentId, token) => {
    return apiRequest(`/documents/${documentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export {
    uploadDocument,
    getDocuments,
    getDocument,
    deleteDocument
};