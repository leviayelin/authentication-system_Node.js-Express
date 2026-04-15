// import section
import { registerUser, loginUser, getUserProfile } from "../service/auth.service.js";

// register request handling
export const register = async (req,res,next)=>{
    try{
        // validation error handling
        const {first_name,last_name,email,password} = req.body;
        if(!first_name || !last_name || !email || !password){
           return res.status(400).json({message:"All fields are required"});
        };

        const user = await registerUser(req.body);
        // seperate password from return data 
        // **note - password will not show as return data 
        const {password_hash, ...safeUser} = user;
        res.status(201).json(safeUser);
    }catch(err){
        // middleware error handling
        next(err);
    };
};

// login request handling 
export const login = async(req,res,next) =>{
    try{
        // validation error handling
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"email & password required!"});
        };
        const token = await loginUser(req.body);
        res.status(200).json({token});
    }catch(err){
        // middleware error handling
        next(err);
    };
};

// get profile request handling
export const getProfile = async(req,res,next)=>{
    try{
        const user = await getUserProfile(req.user.userId)
        res.status(200).json(user);
    }catch(err){
        // middleware error handling
        next(err);
    }
}