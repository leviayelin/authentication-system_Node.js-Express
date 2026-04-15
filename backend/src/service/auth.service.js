// import section 
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail,findUserById } from "../repositories/user.repository.js";
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
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if(!isMatch){
        const error = new Error("Invalid password")
        error.status = 401;
        throw error;
    };
    //3. creating token 
    const token = generateToken(user);
    return token;
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