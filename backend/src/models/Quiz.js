import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        correctAnswer: {
            type: String,
            required: true
        },

        explanation: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const quizSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        document: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        questions: {
            type: [questionSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Quiz = mongoose.model(
    "Quiz",
    quizSchema
);

export default Quiz;