import mongoose from "mongoose";

const messageSchema=new mongoose.Schema(
    {
        sender: {
            type: String,
            enum: ["user", "ai"],
            required: true
        },

        text: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
)

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        chats: [messageSchema],
        isPinned: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Chat=mongoose.model("Chat",chatSchema);