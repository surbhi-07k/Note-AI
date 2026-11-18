import dotenv from "dotenv";

dotenv.config();

const env = {
    port: process.env.PORT || 5000,

    nodeEnv:
        process.env.NODE_ENV || "development",

    clientUrl:
        process.env.CLIENT_URL ||
        "http://localhost:5173",

    mongodbUri:
        process.env.MONGODB_URI ||
        "mongodb://127.0.0.1:27017/ai_notes_generator",

    jwtSecret:
        process.env.JWT_SECRET,

    jwtExpiresIn:
        process.env.JWT_EXPIRES_IN || "7d",

    aiServiceUrl:
        process.env.AI_SERVICE_URL ||
        "http://127.0.0.1:8000"
};

export default env;