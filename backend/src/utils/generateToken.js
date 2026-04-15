// Import section 
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// json web token generator
export const generateToken = (user) =>{
    return jwt.sign(
        {userId:user.id,email:user.email},
        env.jwt_secret,
        {expiresIn:"1h"}
    );
};