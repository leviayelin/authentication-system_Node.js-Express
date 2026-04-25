// Import section 
import jwt from 'jsonwebtoken';

// json web token generator
export const generateToken = (payload,secret,expire) =>{
    return jwt.sign(
        payload,
        secret,
        {expiresIn:expire}
    );
};