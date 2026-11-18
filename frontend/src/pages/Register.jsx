import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";


const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            navigate("/login", {
                replace: true,
                state: {
                    registered: true
                }
            });
        } catch (error) {
            setError(
                error.message ||
                "Registration failed. Please try again."
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

                {/* LEFT */}
                <section className="auth-intro">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">
                            🧠
                        </div>

                        <span>NoteAI</span>
                    </div>

                    <div className="auth-intro-content">
                        <span className="auth-badge">
                            🚀 Start Learning Smarter
                        </span>

                        <h1>
                            Your study material.
                            <span> Reimagined by AI.</span>
                        </h1>

                        <p>
                            Create your NoteAI account and
                            transform long PDFs into smart,
                            structured study notes.
                        </p>

                        <div className="auth-benefits">
                            <div>
                                <span>✓</span>
                                Generate notes from PDFs
                            </div>

                            <div>
                                <span>✓</span>
                                Understand important concepts
                            </div>

                            <div>
                                <span>✓</span>
                                Study faster with AI
                            </div>
                        </div>
                    </div>
                </section>

                {/* RIGHT */}
                <section className="auth-card">

                    <div className="auth-card-header">
                        <div className="auth-card-icon">
                            ✨
                        </div>

                        <h2>Create Account</h2>

                        <p>
                            Start your smarter learning journey.
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
                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                            />
                        </div>

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
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
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
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <span>→</span>
                                </>
                            )}
                        </button>

                    </form>

                    <div className="auth-divider">
                        <span>Already have an account?</span>
                    </div>

                    <Link
                        to="/login"
                        className="auth-secondary-button"
                    >
                        Login to NoteAI
                    </Link>

                    <p className="auth-footer-text">
                        Your account keeps your generated notes
                        private and organized.
                    </p>

                </section>
            </div>
        </main>
    );
};

export default Register;