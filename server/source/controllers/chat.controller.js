import { Chat } from "../models/chat.model.js";

// Create New Chat
export const createChat = async (req, res) => {
    console.log("Reached createChat");
    try {
        const { topic, title, chats } = req.body;
        const chat = await Chat.create({
            user: req.user.id,
            topic,
            title,
            chats
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
        const { userMessage, aiMessage } = req.body;
        const chat = await Chat.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!chat) {
            return res.status(404).json({
                message: "Chat Not Found"
            });

        }
        chat.chats.push(userMessage);
        chat.chats.push(aiMessage);
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