import { apiRequest } from "./api";

const registerUser = async (userData) => {
    return apiRequest("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
};

const loginUser = async (userData) => {
    return apiRequest("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
};

const getCurrentUser = async (token) => {
    return apiRequest("/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export {
    registerUser,
    loginUser,
    getCurrentUser
};