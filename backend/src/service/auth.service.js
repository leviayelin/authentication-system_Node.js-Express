// import section 
import { tokenKeys } from '../config/env.js';
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import { createUser, getUserByEmail,findUserById, getUserRefreshToken, deleteAllUsersTokens, deleteRefreshToken, saveRefreshToken } from "../repositories/user.repository.js";
import { generateToken } from '../utils/generateToken.js';

// Register user
export const registerUser = async({first_name,last_name,email,password})=>{
    // check for already existing user
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        const error =  new Error("User already exist!");
        error.status = 409;
        throw error;
    };

    if(password.length < 6){
        const error = new Error("Password must be 6 or more characther!");
        error.status = 401;
        throw error;
    };
    
    // password hashing 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // save to database
    const user = await createUser(first_name,last_name,email,hashedPassword);
    return user;
};

// Login user
export const loginUser = async({email, password})=>{
    //1. find user
    const user = await getUserByEmail(email)
    if(!user){
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    };
    //2. check password
    const isMatch = await bcrypt.compare(password, user.hash_password);
    if(!isMatch){
        const error = new Error("Invalid password")
        error.status = 401;
        throw error;
    };
    //3. generate access token 
    const accessToken = generateToken({
            userId:user.id,
            email:user.email},tokenKeys.jwt_secret,"1m");
    // 3.a. generate refresh token 
    const refreshToken = generateToken({
            userId:user.id,
            email:user.email},tokenKeys.refresh_secret,"7d");
    
    const hashed = await bcrypt.hash(refreshToken,10);
    await saveRefreshToken({
        userId:user.id,
        token:hashed,
        expireAt: new Date(Date.now() + 7*24*60*60*1000)
        });        
          
    return {accessToken,refreshToken};
};

// refresh tokens rotation : reuse detection
export const refreshTokenService = async(token)=>{

    if(!token){
        throw new Error("No token");
    };
    let decoded;
    try{
         decoded = jwt.verify(token,tokenKeys.refresh_secret);
    }catch(err){
        throw new Error("Invalid refresh token");
    };
    const tokens = await getUserRefreshToken(decoded.userId);
    let validToken = null; // placeholder for validation checking
    for(let t of tokens){
        const match = await bcrypt.compare(token, t.token);
        if(match){
            validToken = t;
            break;
        };
    };
    // token reuse detection 
    if(!validToken){
        await deleteAllUsersTokens(decoded.userId);
        throw new Error("Reuse detected");
    };
    // delete old token 
    await deleteRefreshToken(validToken.id);
    // create new token : access token
    const accessToken  = generateToken(
        {
        userId:decoded.userId,
        email:decoded.email},
        tokenKeys.jwt_secret,"1m");
    // create new token : refresh token
    const refreshToken = generateToken(
        {
        userId:decoded.userId,
        email:decoded.email
        },
        tokenKeys.refresh_secret,"7d");
    // refreshed token : hashing 
    const hashed = await bcrypt.hash(refreshToken,10);

    await saveRefreshToken({
        userId:decoded.userId,
        token:hashed,
        expireAt:new Date(Date.now()+ 7*24*60*60*1000)
    });

    return {accessToken, refreshToken};
};


// get user Profile
export const getUserProfile = async (userId)=>{
    const user = await findUserById(userId);
    if(!user){
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    };
    const {password_hash, ...safeUser} = user;    
    return {
    message:"Wellcome to dashboard",
    user:safeUser
    };  
};

