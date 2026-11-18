import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../services/documentService";
import useAuth from "../context/useAuth";
import {
    getDocuments,
    deleteDocument
} from "../services/documentService";

import { generateNotes } from "../services/noteService";

const Dashboard = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generatingId, setGeneratingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getDocuments(token);

                setDocuments(response.data?.documents || []);
            } catch (error) {
                setError(
                    error.message || "Failed to load documents"
                );
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            loadDocuments();
        }
    }, [token]);

    const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
        setError("Please select a PDF file first.");
        return;
    }

    if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
        setError("PDF size must be less than 10 MB.");
        return;
    }

    try {
        setUploading(true);
        setError("");

        await uploadDocument(selectedFile, token);

        setSelectedFile(null);

        // Refresh the uploaded PDF list.
        const response = await getDocuments(token);
        setDocuments(response.data?.documents || []);
    } catch (error) {
        setError(error.message || "Failed to upload PDF.");
    } finally {
        setUploading(false);
    }
};

    const handleGenerateNotes = async (documentId) => {
        try {
            setGeneratingId(documentId);
            setError("");

            await generateNotes(documentId, token);

            alert("AI notes generated successfully!");

            navigate("/notes");
        } catch (error) {
            setError(
                error.message || "Failed to generate AI notes"
            );
        } finally {
            setGeneratingId(null);
        }
    };

    const handleDelete = async (documentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this PDF?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteDocument(documentId, token);

            setDocuments((previousDocuments) =>
                previousDocuments.filter(
                    (document) => document._id !== documentId
                )
            );
        } catch (error) {
            setError(
                error.message || "Failed to delete document"
            );
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <main className="dashboard-page">
            <div className="dashboard-container">

                <div className="dashboard-header">
                    <div>
                        <h1>
                            Welcome, {user?.name || user?.username}
                        </h1>

                        <p>
                            Your AI Notes Dashboard
                        </p>
                    </div>

                    <button
                        className="dashboard-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}

                <section className="documents-section">

                    <div className="section-header">
    <div>
        <h2>Your Documents</h2>
        <p>
            Upload PDFs, generate AI notes, and manage your study material.
        </p>
    </div>

    <button
        className="primary-button"
        onClick={() => navigate("/notes")}
    >
        📚 My Notes
    </button>
</div>

                    {loading ? (
                        <div className="dashboard-loading">
                            Loading documents...
                        </div>
                    ) : documents.length === 0 ? (
    <div className="dashboard-empty">
        <div className="document-icon">📄</div>

        <h3>No PDFs uploaded yet</h3>

        <p>Upload your first PDF to create AI-powered study notes.</p>

        <form onSubmit={handleUpload} className="dashboard-upload-form">
    <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={(event) =>
            setSelectedFile(event.target.files?.[0] || null)
        }
    />

    <button
        type="submit"
        className="primary-button"
        disabled={uploading || !selectedFile}
    >
        {uploading ? "Uploading..." : "Upload PDF"}
    </button>
</form>
    </div>
) : (
                        <div className="documents-grid">

                            {documents.map((document) => (
                                <div
                                    className="document-card"
                                    key={document._id}
                                >

                                    <div className="document-icon">
                                        📄
                                    </div>

                                    <div className="document-info">

                                        <h3>
                                            {document.title}
                                        </h3>

                                        <p>
                                            {document.originalFileName}
                                        </p>

                                        <span className="document-status">
                                            Status: {document.status}
                                        </span>

                                    </div>

                                    <div className="document-actions">

                                        {document.status === "completed" && (
                                            <button
                                                className="generate-notes-button"
                                                onClick={() =>
                                                    handleGenerateNotes(
                                                        document._id
                                                    )
                                                }
                                                disabled={
                                                    generatingId ===
                                                    document._id
                                                }
                                            >
                                                {generatingId ===
                                                document._id
                                                    ? "Generating..."
                                                    : "✨ Generate AI Notes"}
                                            </button>
                                        )}

                                        <button
                                            className="delete-document-button"
                                            onClick={() =>
                                                handleDelete(
                                                    document._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                    

                </section>

            </div>
        </main>
    );
};

export default Dashboard;