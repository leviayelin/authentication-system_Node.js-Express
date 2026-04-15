// import section 
import express from 'express';
import { register, login, getProfile} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.authMiddleware.js';


// setting router
const router = express.Router();

// config routes - API methods & routes
router.post("/register", register);// new user
router.post("/login",login);// asign token
router.get("/profile", verifyToken,getProfile);// vrify token

// export auth router 
export default router;