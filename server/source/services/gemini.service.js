import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite"
});


export const generateResponse = async (message) => {
    const prompt = `
    You are LearnVault AI, an AI tutor.
    Your responses MUST be in valid Markdown.
    Always follow this exact format.
    # Topic Name

    ## 📘 Explanation
    Explain the topic in simple words suitable for a beginner.

    ## 🔑 Key Points
    - Point 1
    - Point 2
    - Point 3

    ## 📌 Important Notes
    - Mention important facts.

    ## 🎯 Summary
    Summarize in 2-3 lines.
    Do NOT write long paragraphs.

    Conversation:${message}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};