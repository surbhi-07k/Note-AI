import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    

const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
        setError("Please enter your email and password.");
        return;
    }

    try {
        setLoading(true);

        await login(
            formData.email.trim(),
            formData.password
        );

        navigate("/dashboard", {
            replace: true
        });
    } catch (error) {
        setError(
            error.message || "Unable to log in. Please try again."
        );
    } finally {
        setLoading(false);
    }
};



    return (
        <main className="auth-page">
            <div className="auth-background-shape auth-shape-one"></div>
            <div className="auth-background-shape auth-shape-two"></div>

            <div className="auth-container">

                {/* LEFT SIDE */}
                <section className="auth-intro">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">
                            🧠
                        </div>

                        <span>NoteAI</span>
                    </div>

                    <div className="auth-intro-content">
                        <span className="auth-badge">
                            ✨ AI-Powered Learning
                        </span>

                        <h1>
                            Turn your PDFs into
                            <span> smart knowledge.</span>
                        </h1>

                        <p>
                            Upload your study material and let
                            NoteAI create clear, organized and
                            easy-to-understand notes for you.
                        </p>

                        <div className="auth-benefits">
                            <div>
                                <span>✓</span>
                                AI-generated study notes
                            </div>

                            <div>
                                <span>✓</span>
                                Smart summaries and key points
                            </div>

                            <div>
                                <span>✓</span>
                                Everything in one place
                            </div>
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDE */}
                <section className="auth-card">

                    <div className="auth-card-header">
                        <div className="auth-card-icon">
                            👋
                        </div>

                        <h2>Welcome Back</h2>

                        <p>
                            Login to continue your learning journey.
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">
                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>New to NoteAI?</span>
                    </div>

                    <Link
                        to="/register"
                        className="auth-secondary-button"
                    >
                        Create an Account
                    </Link>

                    <p className="auth-footer-text">
                        By continuing, you agree to use NoteAI
                        responsibly for your learning.
                    </p>

                </section>
            </div>
        </main>
    );
};

export default Login;