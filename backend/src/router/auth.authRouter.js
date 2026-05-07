// import section 
import express from 'express';
import { register, login, getProfile, logout, getCSRFToken, refreshToken} from '../controllers/auth.controller.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';
import { verifyToken } from '../middleware/auth.authMiddleware.js';
import { loginLimiter,registerLimiter } from '../middleware/auth.rateLimitMiddleware.js';


// setting router
const router = express.Router();

// config routes : API methods & routes
router.get("/csrf-token", csrfProtection, getCSRFToken); // CSRF protection token
router.post("/register",registerLimiter, csrfProtection, register);// new user
router.post("/login", loginLimiter, csrfProtection, login);// asign token
router.post("/refresh",refreshToken); // refresh token's
router.get("/profile", verifyToken, getProfile);// verify token
router.post("/logout", csrfProtection, logout); // clear cookies + token

// export auth router 
export default router;