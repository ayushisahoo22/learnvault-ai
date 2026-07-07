import { User } from "../models/user.model.js";
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(201).json(
                {message:"User already exists"}
            )
        }
        const user = await User.create({
            name,
            email,
            password
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