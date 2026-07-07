import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/db.js";

const app=express();
connectDB()
app.use(cors());
app.use(express.json());

import router from "./routes/authRoute.js";
app.use("/api/auth",router);

app.get("/",(req,res)=>{
    res.send("Backend Running");
})
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})