import { generateResponse } from "../services/gemini.service.js";

export const testGemini = async (req, res) => {
    try {
        const { message } = req.body;
        const reply = await generateResponse(message);
        res.json({
            reply
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};