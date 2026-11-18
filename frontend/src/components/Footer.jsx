import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-top">

                    <div className="footer-brand">

                        <h3>
                            🧠 NoteAI
                        </h3>

                        <p>
                            Transform your PDFs into smart,
                            organized and easy-to-understand
                            study notes using Artificial Intelligence.
                        </p>

                    </div>

                    <div className="footer-links">

                        <Link to="/">
                            Home
                        </Link>

                        <a href="/#features">
                            Features
                        </a>

                        <a href="/#how-it-works">
                            How It Works
                        </a>

                        <Link to="/notes">
                            My Notes
                        </Link>

                    </div>

                </div>

                <div className="footer-bottom">
                    © 2026 NoteAI. Built with React, Node.js,
                    MongoDB and AI.
                </div>

            </div>

        </footer>
    );
};

export default Footer;