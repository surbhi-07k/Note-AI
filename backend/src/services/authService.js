import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async ({
    name,
    email,
    password
}) => {
    const existingUser = await User.findOne({
        email
    });

    if (existingUser) {
        const error = new Error(
            "User with this email already exists"
        );

        error.statusCode = 409;

        throw error;
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);

    const userObject = user.toObject();

    delete userObject.password;

    return {
        user: userObject,
        token
    };
};

const loginUser = async ({
    email,
    password
}) => {
    const user = await User.findOne({
        email
    }).select("+password");

    if (!user) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;

        throw error;
    }

    const token = generateToken(user._id);

    const userObject = user.toObject();

    delete userObject.password;

    return {
        user: userObject,
        token
    };
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;

        throw error;
    }

    return user;
};

export {
    registerUser,
    loginUser,
    getUserById
};