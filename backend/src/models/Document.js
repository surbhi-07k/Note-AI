import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        originalFileName: {
            type: String,
            required: true
        },

        fileUrl: {
            type: String,
            default: ""
        },

        fileSize: {
            type: Number,
            default: 0
        },

        extractedText: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "uploaded",
                "processing",
                "completed",
                "failed"
            ],
            default: "uploaded"
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model(
    "Document",
    documentSchema
);

export default Document;