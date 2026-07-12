import express from "express"
import { testGemini } from "../controllers/test.controller.js"
const router = express.Router();
router.post("/",testGemini);
export default router;