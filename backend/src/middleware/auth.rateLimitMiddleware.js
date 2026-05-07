// Import section 
import { rateLimitOption } from '../config/env.js';
import rateLimit from 'express-rate-limit';

// Rate limiting : api
export const apiLimiter = rateLimit({
    windowMs: 60*1000,
    max:100
});

// Rate limiting : login 
export const loginLimiter = rateLimit({
    windowMs: 60*1000, // time window in milisecons
    max: 3, //attempts
    message:{
        message: "To Many Login Attempts, try again letter."
    },
    standardHeaders:rateLimit.standardHeaders,
    legacyHeaders:rateLimit.legacyHeaders
});

// Rate limiting : register
export const registerLimiter = rateLimit({
    windowMs:10*60*1000,
    max:3,
    message:{
        error:"Too many requests, please slow down"
    }
});
