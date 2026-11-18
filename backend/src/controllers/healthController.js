const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Notes Generator Backend is healthy",
        service: "backend",
        status: "running"
    });
};

export { getHealth };