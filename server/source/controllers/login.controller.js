import bcrypt from "bcryptjs";
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