import {
    useEffect,
    useRef,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth";

import {
    getNotes,
    deleteNote
} from "../services/noteService";

import {
    uploadDocument
} from "../services/documentService";


const Notes = () => {

    const { token } = useAuth();

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // Load AI Notes
    // ==========================================

    useEffect(() => {

        const loadNotes = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await getNotes(token);

                setNotes(
                    response.data?.notes || []
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.message ||
                    "Failed to load AI notes."
                );

            } finally {

                setLoading(false);

            }
        };


        if (token) {
            loadNotes();
        }

    }, [token]);


    // ==========================================
    // Open PDF picker
    // ==========================================

    const handleUploadClick = () => {

        fileInputRef.current?.click();

    };


    // ==========================================
    // Upload selected PDF
    // ==========================================

    const handleFileChange = async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }


        setError("");


        // Check PDF
        if (file.type !== "application/pdf") {

            setError(
                "Please select a PDF file."
            );

            event.target.value = "";

            return;
        }


        // Check 10 MB limit
        if (file.size > 10 * 1024 * 1024) {

            setError(
                "PDF size must be less than 10 MB."
            );

            event.target.value = "";

            return;
        }


        try {

            setUploading(true);


            await uploadDocument(
                file,
                token
            );


            // Clear file input
            event.target.value = "";


            // Go to Dashboard where
            // user can generate AI notes
            navigate("/dashboard");


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to upload PDF."
            );

        } finally {

            setUploading(false);

        }
    };


    // ==========================================
    // Delete AI Note
    // ==========================================

    const handleDelete = async (noteId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this AI note?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteNote(
                noteId,
                token
            );


            setNotes((previousNotes) =>
                previousNotes.filter(
                    (note) =>
                        note._id !== noteId
                )
            );


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to delete note."
            );
        }
    };


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <main className="notes-page">

                <div className="notes-container">

                    <div className="notes-loading">
                        Loading your AI notes...
                    </div>

                </div>

            </main>
        );
    }


    return (
        <main className="notes-page">

            <div className="notes-container">

                {/* Hidden PDF input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    style={{
                        display: "none"
                    }}
                />


                {/* Header */}

                <div className="notes-hero">

                    <div>

                        <div className="notes-badge">
                            ✨ AI Powered
                        </div>

                        <h1>
                            My AI Notes
                        </h1>

                        <p>
                            Smart study notes generated
                            from your PDF documents.
                        </p>

                    </div>


                    <button
                        className="upload-pdf-button"
                        onClick={handleUploadClick}
                        disabled={uploading}
                    >
                        {uploading
                            ? "Uploading..."
                            : "+ Upload PDF"}
                    </button>

                </div>


                {/* Error */}

                {error && (
                    <div className="notes-error">
                        {error}
                    </div>
                )}


                {/* Notes */}

                {notes.length === 0 ? (

                    <div className="notes-empty">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h2>
                            No AI notes yet
                        </h2>

                        <p>
                            Upload a PDF to create
                            your first set of smart
                            study notes.
                        </p>

                        <button
                            className="primary-button"
                            onClick={handleUploadClick}
                            disabled={uploading}
                        >
                            {uploading
                                ? "Uploading..."
                                : "Upload Your First PDF"}
                        </button>

                    </div>

                ) : (

                    <>

                        <div className="notes-count">
                            {notes.length} AI{" "}
                            {notes.length === 1
                                ? "Note"
                                : "Notes"}
                        </div>


                        <div className="notes-grid">

                            {notes.map((note) => (

                                <article
                                    className="note-card"
                                    key={note._id}
                                >

                                    <div className="note-card-top">

                                        <div className="note-icon">
                                            🤖
                                        </div>

                                        <span>
                                            AI Generated
                                        </span>

                                    </div>


                                    <h2>
                                        {note.title}
                                    </h2>


                                    <p className="note-source">
                                        📄{" "}
                                        {note.document
                                            ?.originalFileName ||
                                            "PDF Document"}
                                    </p>


                                    <p className="note-summary">

                                        {note.summary
                                            ? note.summary.slice(
                                                0,
                                                180
                                            )
                                            : "AI-generated study notes."}

                                        {note.summary &&
                                            note.summary.length >
                                            180
                                            ? "..."
                                            : ""}

                                    </p>


                                    <div className="note-card-bottom">

                                        <span>
                                            {note.keyPoints
                                                ?.length || 0}{" "}
                                            Key Points
                                        </span>

                                    </div>


                                    <div className="note-actions">

                                        <button
                                            className="view-note-button"
                                            onClick={() =>
                                                navigate(
                                                    `/notes/${note._id}`
                                                )
                                            }
                                        >
                                            View Notes
                                        </button>


                                        <button
                                            className="delete-note-button"
                                            onClick={() =>
                                                handleDelete(
                                                    note._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    </>
                )}

            </div>

        </main>
    );
};

export default Notes;