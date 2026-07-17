import { Chat } from "../models/chat.model.js";
import { generateResponse } from "../services/gemini.service.js";

// Create New Chat
export const createChat = async (req, res) => {
    console.log("Reached createChat");
    try {
        const { topic, title, message } = req.body;
        const aiReply = await generateResponse(message);
        const chat = await Chat.create({
            user: req.user.id,
            topic,
            title,
            chats: [
                {
                    sender: "user",
                    text: message
                },
                {
                    sender: "ai",
                    text: aiReply
                }
            ]
        });
        return res.status(201).json({
            message: "Chat Created Successfully",
            chat
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }
};

// Get All Chats of Logged In User
export const getChats = async (req, res) => {

    try {
        const chats = await Chat.find({
            user: req.user.id
        }).sort({
            updatedAt: -1
        });
        return res.status(200).json(chats);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Chat
export const getSingleChat = async (req, res) => {

    try {

        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });

        }
        return res.status(200).json(chat);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }
};


// Continue Existing Chat
export const continueChat = async (req, res) => {
    try {
        const { message } = req.body;
        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });

        }
        let conversation = "";

        chat.chats.forEach((msg) => {
            conversation += `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}\n`;
        });

        conversation += `User: ${message}\nAssistant:`;
        const aiReply = await generateResponse(conversation);
        chat.chats.push({
            sender: "user",
            text: message
        });
        chat.chats.push({
            sender: "ai",
            text: aiReply
        });
        await chat.save();
        return res.status(200).json({
            message: "Chat Updated",
            chat
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }

};

// Delete Chat
export const deleteChat = async (req, res) => {

    try {
        const chat = await Chat.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });

        }

        return res.status(200).json({
            message: "Chat Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }
};

export const togglePin = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });
        }
        chat.isPinned = !chat.isPinned;
        await chat.save();
        return res.status(200).json(chat);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });

    }
};

export const generateNotes = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });
    
        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });
        }
        let conversation = "";
        chat.chats.forEach(msg => {
            conversation += `${msg.sender}: ${msg.text}\n`;
        });
    
        const prompt = `
        You are an expert study assistant.
        Read the following conversation carefully and create COMPLETE study notes.

        Requirements:
        - Cover every important concept discussed.
        - Do NOT skip explanations.
        - Preserve the logical flow of the conversation.
        - Include all definitions.
        - Include all examples.
        - Include all code snippets if discussed.
        - Explain why the code works.
        - Mention advantages, disadvantages, and use cases whenever relevant.
        - Highlight important interview points.
        - Mention common mistakes and pitfalls if discussed.
        - Add tips and best practices.
        - At the end, provide a concise revision section.

        Format the response in proper Markdown.
        Use this structure:
        # Topic Name
        ## Overview
        ## Concepts
        ## Detailed Explanation
        ## Examples
        ## Code (if any)
        ## Important Points
        ## Common Mistakes
        ## Interview Questions
        ## Quick Revision
        Conversation: ${conversation}`;
        const generatedNotes = await generateResponse(prompt);
        chat.notes = generatedNotes;
        chat.isNote = true;
        await chat.save();
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const removeNotes = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });
        }

        chat.isNote = false;
        chat.notes = "";

        await chat.save();

        return res.status(200).json({
            message: "Notes Removed",
            chat
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};