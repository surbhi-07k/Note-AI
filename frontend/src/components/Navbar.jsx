import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import "../index.css";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const getLinkClass = ({ isActive }) =>
        isActive ? "navbar-link active" : "navbar-link";

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <NavLink to="/" className="navbar-logo">
                    <span className="navbar-logo-icon">🧠</span>
                    NoteAI
                </NavLink>

                {/* Navigation links */}
                <nav className="navbar-links">
                    <NavLink to="/" end className={getLinkClass}>
                        Home
                    </NavLink>

                    <NavLink
                        to="/features"
                        className={getLinkClass}
                    >
                        Features
                    </NavLink>

                    <NavLink
                        to="/how-it-works"
                        className={getLinkClass}
                    >
                        How It Works
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={getLinkClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/notes"
                                className={getLinkClass}
                            >
                                My Notes
                            </NavLink>

                            <div className="navbar-user">
                                <span className="navbar-user-name">
                                    Hi, {user?.name || "Learner"}
                                </span>

                                <button
                                    type="button"
                                    className="navbar-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={getLinkClass}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="navbar-register"
                            >
                                Get Started
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
