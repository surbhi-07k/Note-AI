import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
    loginUser,
    registerUser,
    getCurrentUser
} from "../services/authService";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );

    const [loading, setLoading] = useState(true);

    // Restore the login session after refreshing the page.
    useEffect(() => {
        let cancelled = false;

        const restoreSession = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const response = await getCurrentUser(token);

                const currentUser =
                    response?.data?.user ??
                    response?.user ??
                    null;

                if (!response?.success || !currentUser) {
                    throw new Error("Unable to restore login session.");
                }

                if (!cancelled) {
                    setUser(currentUser);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Session restore failed:", error);
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        restoreSession();

        return () => {
            cancelled = true;
        };
    }, [token]);

    // Login using the backend API.
    const login = async (email, password) => {
        const response = await loginUser({
            email,
            password
        });

        const data = response?.data;

        const newToken =
            data?.token ??
            data?.accessToken ??
            response?.token ??
            response?.accessToken;

        let newUser =
            data?.user ??
            response?.user ??
            null;

        if (!newToken) {
            throw new Error(
                response?.message || "Login failed. Please check your credentials."
            );
        }

        // Save the token before requesting the user profile.
        localStorage.setItem("token", newToken);
        setToken(newToken);

        // If login does not return a user, request /auth/me.
        if (!newUser) {
            try {
                const userResponse = await getCurrentUser(newToken);

                newUser =
                    userResponse?.data?.user ??
                    userResponse?.user ??
                    null;

                if (!newUser) {
                    throw new Error(
                        "Login succeeded, but the user profile could not be loaded."
                    );
                }
            } catch (error) {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
                throw error;
            }
        }

        setUser(newUser);

        return response;
    };

    // Register a new user.
    const register = async (userData) => {
        const response = await registerUser(userData);

        if (response?.success === false) {
            throw new Error(
                response?.message || "Registration failed."
            );
        }

        return response;
    };

    // Logout.
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token && user)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;