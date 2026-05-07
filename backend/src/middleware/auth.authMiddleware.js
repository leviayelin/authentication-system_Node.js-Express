// import section
import { tokenKeys } from "../config/env.js";
import jwt  from "jsonwebtoken";

// middleware authentication - Verify token
// note - this used to check/verify user  request 
export const verifyToken = (req,res,next)=>{
    // check for cookies in request
    const token = req.cookies.accessToken;
    // check for token
    if(!token){
        return res.status(401).json({message:"No token provided"});
    };

    try{
        // - check for signature (secret)
        // - check if expire
        // - return payload
        const decoded = jwt.verify(token,tokenKeys.jwt_secret);
        req.user = decoded;
        // forword if success
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    };
};