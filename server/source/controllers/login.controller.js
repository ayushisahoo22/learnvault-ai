import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                message:"User does not exists"
            })
        }
        const isCorrect= await bcrypt.compare(password,user.password);
        if(!isCorrect){
            res.status(400).json({
                message:"Invalid Password"
            })
        }
        const token = jwt.sign(
            { 
                id: user._id,
                email:user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );
        res.status(201).json({
            message:"Login successful"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export default loginUser;