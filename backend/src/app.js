// import section 
import express from 'express';
import cors from 'cors';
import { corsOption } from './config/env.js';
import cookieParser from 'cookie-parser';
import authRouter from './router/auth.authRouter.js';
import { errorHandler } from './middleware/errorMiddleware.js';

//app usage settings
const app = express();
app.use(express.json()); // enable json
app.use(cors(corsOption)); // cors http - connect to frontend
app.use(cookieParser()); // enable use of cookies

// app API routes
app.use('/api/auth',authRouter);

// note : error handling  
app.use(errorHandler);// enable use of next()

// export app 
export default app;