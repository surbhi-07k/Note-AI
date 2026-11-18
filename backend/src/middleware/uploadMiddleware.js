import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
    req,
    file,
    callback
) => {
    if (file.mimetype === "application/pdf") {
        callback(null, true);
    } else {
        callback(
            new Error("Only PDF files are allowed"),
            false
        );
    }
};

const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter
});

export default upload;