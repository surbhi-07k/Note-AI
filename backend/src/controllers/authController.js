import {
    registerUser,
    loginUser,
    getUserById
} from "../services/authService.js";

const register = async (
    req,
    res,
    next
) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters"
            });
        }

        const result =
            await registerUser({
                name,
                email: email.toLowerCase().trim(),
                password
            });

        return res.status(201).json({
            success: true,
            message:
                "User registered successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const login = async (
    req,
    res,
    next
) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required"
            });
        }

        const result =
            await loginUser({
                email: email.toLowerCase().trim(),
                password
            });

        return res.status(200).json({
            success: true,
            message:
                "Login successful",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getMe = async (
    req,
    res,
    next
) => {
    try {
        const user =
            await getUserById(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    getMe
};