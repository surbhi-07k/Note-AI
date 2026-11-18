const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    console.error(error);

    if (
        error.name ===
        "MulterError"
    ) {
        if (
            error.code ===
            "LIMIT_FILE_SIZE"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "File size cannot exceed 10 MB"
            });
        }

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    const statusCode =
        error.statusCode || 500;

    return res.status(
        statusCode
    ).json({
        success: false,
        message:
            error.message ||
            "Internal Server Error"
    });
};

export default errorMiddleware;