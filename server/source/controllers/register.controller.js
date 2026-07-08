import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(201).json(
                {message:"User already exists"}
            )
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"User Registered",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}

export default registerUser