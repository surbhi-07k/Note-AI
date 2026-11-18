import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import useAuth from "../context/useAuth";

import {
    getNote
} from "../services/noteService";


const NoteDetails = () => {

    const {
        token
    } = useAuth();


    const {
        id
    } = useParams();


    const [
        note,
        setNote
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        const loadNote = async () => {

            try {

                setLoading(true);

                const response =
                    await getNote(
                        id,
                        token
                    );

                setNote(
                    response.data.note
                );

            } catch (error) {

                setError(
                    error.message
                );

            } finally {

                setLoading(false);

            }
        };


        if (token) {
            loadNote();
        }

    }, [id, token]);


    if (loading) {

        return (
            <div className="details-page">

                <div className="details-loading">

                    <div className="loading-spinner">
                    </div>

                    <h2>
                        Preparing your notes...
                    </h2>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="details-page">

                <div className="notes-container">

                    <div className="notes-error">
                        ⚠️ {error}
                    </div>

                    <Link
                        to="/notes"
                        className="back-notes-button"
                    >
                        ← Back to My Notes
                    </Link>

                </div>

            </div>
        );
    }


    if (!note) {
        return null;
    }


    return (

        <div className="details-page">

            <div className="details-container">


                <Link
                    to="/notes"
                    className="back-notes-button"
                >
                    ← Back to My Notes
                </Link>


                <header className="note-header">

                    <div className="note-header-icon">
                        📘
                    </div>


                    <div>

                        <span className="notes-badge">
                            ✨ AI Generated Notes
                        </span>

                        <h1>
                            {note.title}
                        </h1>


                        {note.document && (

                            <p>

                                Generated from:
                                {" "}
                                <strong>
                                    {
                                        note.document
                                            .originalFileName
                                    }
                                </strong>

                            </p>

                        )}

                    </div>

                </header>


                <section className="summary-section">

                    <div className="section-title">

                        <span>
                            ✨
                        </span>

                        <h2>
                            AI Summary
                        </h2>

                    </div>


                    <p>
                        {note.summary}
                    </p>

                </section>


                <section className="key-points-section">

                    <div className="section-title">

                        <span>
                            📌
                        </span>

                        <h2>
                            Key Points
                        </h2>

                    </div>


                    <div className="key-points-list">

                        {note.keyPoints?.map(
                            (
                                point,
                                index
                            ) => (

                                <div
                                    className="key-point"
                                    key={index}
                                >

                                    <span className="check-icon">
                                        ✓
                                    </span>

                                    <p>
                                        {point}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </section>


                <section className="detailed-notes-section">

                    <div className="section-title">

                        <span>
                            📚
                        </span>

                        <h2>
                            Detailed Notes
                        </h2>

                    </div>


                    <div className="detailed-content">

                        {note.content
                            ?.split("\n")
                            .map(
                                (
                                    line,
                                    index
                                ) => {

                                    const trimmed =
                                        line.trim();


                                    if (!trimmed) {

                                        return (
                                            <div
                                                key={index}
                                                className="content-space"
                                            />
                                        );

                                    }


                                    if (
                                        /^\d+\./.test(
                                            trimmed
                                        )
                                    ) {

                                        return (
                                            <h3
                                                key={index}
                                            >
                                                {trimmed}
                                            </h3>
                                        );

                                    }


                                    if (
                                        trimmed.startsWith(
                                            "•"
                                        ) ||
                                        trimmed.startsWith(
                                            "-"
                                        )
                                    ) {

                                        return (
                                            <div
                                                key={index}
                                                className="content-bullet"
                                            >
                                                <span>
                                                    •
                                                </span>

                                                <p>
                                                    {
                                                        trimmed
                                                            .replace(
                                                                /^[•-]\s*/,
                                                                ""
                                                            )
                                                    }
                                                </p>
                                            </div>
                                        );

                                    }


                                    return (
                                        <p
                                            key={index}
                                        >
                                            {trimmed}
                                        </p>
                                    );

                                }
                            )}

                    </div>

                </section>


                <div className="notes-bottom-actions">

                    <Link
                        to="/notes"
                        className="back-notes-button"
                    >
                        ← Back to My Notes
                    </Link>

                </div>

            </div>

        </div>

    );
};


export default NoteDetails;