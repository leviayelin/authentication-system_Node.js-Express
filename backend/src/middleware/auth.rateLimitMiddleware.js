// Import section 
import rateLimit from 'express-rate-limit';

// Rate limit : api
export const apiLimiter = rateLimit({
    windowMs: 60*1000,
    max:100
});

// Rate limit : login 
export const loginLimiter = rateLimit({
    windowMs: 60*1000, // time window in milisecons
    max: 3, //attempts
    message:{
        message: "To Many Login Attempts, try again letter."
    },
    standardHeaders:true,
    legacyHeaders:false
});

// Rate limit : register
export const registerLimiter = rateLimit({
    windowMs:10*60*1000,
    max:3,
    message:{
        error:"Too many requests, please slow down"
    }
});
