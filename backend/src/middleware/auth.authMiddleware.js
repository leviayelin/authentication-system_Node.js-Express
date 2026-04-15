// import section
import jwt  from "jsonwebtoken";
import { env } from "../config/env.js";


// middleware authentication - Verify token
// note - this used to check/verify user  request 
export const verifyToken = (req,res,next)=>{
    // check for header
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"No token provided"});
    }
    // extract token -
    // note: when extract authorizatoin, the string that get back is
    // "bearer hash_token". by using split and [place] the token is gotten 
    const token = authHeader.split(" ")[1];

    try{
        // - check for signature (secret)
        // - check if expire
        // - return payload
        const decoded = jwt.verify(token, env.jwt_secret)
        req.user = decoded;

        next();
    }catch(err){
        return res.status(401).json({message:"Invalid token"})
    }
}