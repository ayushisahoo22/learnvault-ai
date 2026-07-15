import express from "express";
import {
    createChat,
    getChats,
    getSingleChat,
    continueChat,
    deleteChat,
    togglePin
} from "../controllers/chat.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/create", verifyJWT, createChat);
router.get("/", verifyJWT, getChats);
router.get("/:id", verifyJWT, getSingleChat);
router.patch("/:id", verifyJWT, continueChat);  //to change part of a resource
router.patch("/pin/:id", verifyJWT, togglePin);
router.delete("/:id", verifyJWT, deleteChat);

export default router;