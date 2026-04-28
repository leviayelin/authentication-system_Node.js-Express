// import section
import { registerUser, loginUser, getUserProfile, refreshTokenService } from "../service/auth.service.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { env } from "../config/env.js";
import { generateToken } from "../utils/generateToken.js";
import { saveRefreshToken } from "../repositories/user.repository.js";

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
        const {accessToken, refreshToken} = await loginUser(req.body);

        // cookies : access + refresh
        res.cookie("accessToken", accessToken,{
            httpOnly:true,
            secure:process.env.COOKIE_SECURE,
            maxAge:1000 * 60 * 1,
            sameSite:"Lax"
        });
        
        res.cookie("refreshToken", refreshToken,{
            httpOnly:true,
            secure:process.env.COOKIE_SECURE,
            maxAge:1000 * 60 * 60 * 24 * 7,
            sameSite:"Lax"
        });
        
        return res.status(200).json({message:"Login successfull"});
    }catch(err){
        // middleware error handling
        next(err);
    };
};

// refresh route 
export const refreshToken = async(req,res,next)=>{
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message:"No Refresh Token"});
    };
    try{
        const {accessToken, refreshToken} = await refreshTokenService(token);

        res.cookie("accessToken", accessToken,{
            httpOnly:true,
            secure:process.env.COOKIE_SECURE,
            maxAge:1000 * 60 * 1,
            sameSite:"Lax"
        });

        res.cookie("refreshToken", refreshToken,{
            httpOnly:true,
            secure:process.env.COOKIE_SECURE,
            maxAge:1000 * 60 * 60 * 24 * 7,
            sameSite:"Lax"
        })

        return res.status(200).json({message:"Token Refreshed"});
    }catch(err){
        // return res.status(403).json({message:"Invalid Refresh Token"});
        next(err)
    }
};

// get profile request handling
export const getProfile = async(req,res,next)=>{
    try{
        const user = await getUserProfile(req.user.userId)
        return res.status(200).json(user);
    }catch(err){
        // middleware error handling    
        next(err);
    };
};

// logout - clear remain cookies in browser + logout user
export const logout = (req,res)=>{
    res.clearCookie("_csrf");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({message:"Loged out"});
};

// get CSRF token 
export const getCSRFToken = (req,res)=>{
    res.json({csrfToken: req.csrfToken()});
};