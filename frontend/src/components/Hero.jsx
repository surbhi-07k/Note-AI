import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">

            <div className="hero-content">

                <div className="hero-badge">
                    ✨ AI-Powered Learning Assistant
                </div>

                <h1 className="hero-title">
                    Turn Your PDFs Into
                    <span>Smart Notes</span>
                </h1>

                <p className="hero-description">
                    Upload your PDF and let AI transform lengthy
                    documents into clear, organized and
                    easy-to-understand notes in seconds.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-button"
                        onClick={() => navigate("/notes")}
                    >
                        Generate Notes
                    </button>

                    <button
                        className="secondary-button"
                        onClick={() =>
                            document
                                .getElementById("how-it-works")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >
                        Learn More
                    </button>

                </div>

            </div>

        </section>
    );
};

export default Hero;