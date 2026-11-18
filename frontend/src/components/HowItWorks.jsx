import { Link } from "react-router-dom";

function HowItWorks() {
    return (
        <main className="info-page">
            <span className="section-badge">⚡ Simple Process</span>
            <h1>How NoteAI Works</h1>
            <p>Turn your study material into useful notes in four simple steps.</p>

            <div className="info-grid">
                <article className="info-card">
                    <span className="step-number">01</span>
                    <h2>📤 Upload Your PDF</h2>
                    <p>Select the PDF document you want to study.</p>
                </article>

                <article className="info-card">
                    <span className="step-number">02</span>
                    <h2>🤖 AI Processing</h2>
                    <p>Our AI analyzes the text extracted from your document.</p>
                </article>

                <article className="info-card">
                    <span className="step-number">03</span>
                    <h2>📝 Generate Notes</h2>
                    <p>Get a summary, key points, and detailed notes.</p>
                </article>

                <article className="info-card">
                    <span className="step-number">04</span>
                    <h2>🎓 Study Smarter</h2>
                    <p>Review your notes whenever you need them.</p>
                </article>
            </div>

            <Link className="primary-button" to="/login">
                Start Learning
            </Link>
        </main>
    );
}

export default HowItWorks;