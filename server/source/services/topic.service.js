import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite"
});

export const detectTopic = async (message) => {

    const prompt = `
    You are an AI topic classifier.
    Your job is to classify the user's message into ONE topic.

    Rules:
    - Return ONLY the topic name.
    - Do NOT explain anything.
    - Maximum 2 words.
    - Use Title Case.

    If the message is casual, greeting, small talk, jokes, motivation, or doesn't belong to a technical subject, return:General

    Use these topics whenever possible:
    - React
    - DSA
    - JavaScript
    - HTML
    - CSS
    - Node.js
    - Express
    - MongoDB
    - SQL
    - DBMS
    - Operating System
    - Computer Networks
    - OOP
    - Git
    - Aptitude
    - General

    Examples:
    "What is useEffect?" React
    "Explain Binary Search" DSA
    "What is MongoDB Aggregation?" MongoDB 
    "Hi" General
    "Hello" General
    "How are you?" General
    "Tell me a joke" General
    "Good morning" General

    User Message:${message}`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
};