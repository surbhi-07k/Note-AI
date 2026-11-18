
const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseText = await response.text();

    let result;

    try {
        result = responseText ? JSON.parse(responseText) : {};
    } catch {
        throw new Error(
            `Server returned an invalid response (${response.status}). ` +
            "Check that the backend is running and the API route is correct."
        );
    }

    if (!response.ok || result.success === false) {
        throw new Error(
            result.message ||
            result.detail ||
            `Request failed with status ${response.status}.`
        );
    }

    return result;
};

export { apiRequest };
