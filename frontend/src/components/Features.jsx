import { Link } from "react-router-dom";

function Features() {
    return (
        <main className="info-page">
            <span className="section-badge">✨ Powerful Features</span>
            <h1>Everything You Need to Study Smarter</h1>
            <p>
                NoteAI transforms your PDFs into clear, organized,
                easy-to-understand study notes.
            </p>

            <div className="info-grid">
                <article className="info-card">
                    <h2>📝 Smart Notes</h2>
                    <p>Generate structured notes from your PDF documents.</p>
                </article>

                <article className="info-card">
                    <h2>🤖 AI Summaries</h2>
                    <p>Understand important concepts with concise summaries.</p>
                </article>

                <article className="info-card">
                    <h2>🎯 Key Points</h2>
                    <p>Identify the important topics to revise for exams.</p>
                </article>

                <article className="info-card">
                    <h2>📚 My Notes</h2>
                    <p>Keep your generated notes organized in one place.</p>
                </article>
            </div>

            <Link className="primary-button" to="/login">
                Get Started
            </Link>
        </main>
    );
}

export default Features;