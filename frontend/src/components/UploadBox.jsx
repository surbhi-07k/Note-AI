import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth";
import { uploadDocument } from "../services/documentService";

const UploadBox = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setError("");

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            setFile(null);
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("PDF size must be less than 10 MB.");
            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF first.");
            return;
        }

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await uploadDocument(file, token);

            alert("PDF uploaded successfully!");

            navigate("/dashboard");
        } catch (error) {
            console.error("Upload error:", error);

            setError(
                error.message || "Failed to upload PDF."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-box">

            <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
            />

            {file && (
                <p className="selected-file">
                    Selected: {file.name}
                </p>
            )}

            {error && (
                <div className="upload-error">
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={handleUpload}
                disabled={loading || !file}
            >
                {loading ? "Uploading..." : "Generate Notes"}
            </button>

        </div>
    );
};

export default UploadBox;