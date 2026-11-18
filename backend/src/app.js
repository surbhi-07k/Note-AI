import express from "express";
import cors from "cors";
import env from "./config/env.js";

import routes from "./routes/index.js";

import notFoundMiddleware
    from "./middleware/notFoundMiddleware.js";

import errorMiddleware
    from "./middleware/errorMiddleware.js";

const app = express();

app.use(
    cors({
        origin: env.clientUrl
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    "/api",
    routes
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Notes Generator Backend is running"
    });
});

app.use(
    notFoundMiddleware
);

app.use(
    errorMiddleware
);

export default app;