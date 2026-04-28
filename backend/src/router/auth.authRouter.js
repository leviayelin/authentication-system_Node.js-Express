// import section 
import express from 'express';
import { register, login, getProfile, logout, getCSRFToken, refreshToken} from '../controllers/auth.controller.js';
import { csrfProtection } from '../middleware/csrf.middleware.js';
import { verifyToken } from '../middleware/auth.authMiddleware.js';


// setting router
const router = express.Router();

// config routes - API methods & routes
router.get("/csrf-token", csrfProtection, getCSRFToken);
router.post("/register",csrfProtection, register);// new user
router.post("/login", csrfProtection, login);// asign token
router.post("/refresh",refreshToken); // refresh token's
router.get("/profile", verifyToken, getProfile);// vrify token
router.post("/logout", csrfProtection, logout); // clear cookies + token

// export auth router 
export default router;