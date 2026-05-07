// Import section 
import jwt from 'jsonwebtoken';

// JWT generator callback function 
export const generateToken = (payload,secret,expire) =>{
    return jwt.sign(
        payload,
        secret,
        {expiresIn:expire}
    );
};