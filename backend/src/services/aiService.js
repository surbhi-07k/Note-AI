import axios from "axios";

import env from "../config/env.js";


const generateNotesWithAI = async (
    text
) => {

    try {

        const response =
            await axios.post(
                `${env.aiServiceUrl}/generate-notes`,
                {
                    text
                },
                {
                    timeout: 120000
                }
            );


        return response.data.data;

    } catch (error) {

        console.error(
            "AI service error:",
            error.response?.data ||
            error.message
        );


        const aiError = new Error(
            "Failed to generate notes using AI service"
        );

        aiError.statusCode = 502;

        throw aiError;
    }
};


export {
    generateNotesWithAI
};