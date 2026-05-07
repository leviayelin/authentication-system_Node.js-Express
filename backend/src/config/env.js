// import section 
import 'dotenv/config'

// DB connection setting 
export const poolOption = {
    db_port:process.env.DB_PORT,
    db_host:process.env.DB_HOST,
    db_name:process.env.DB_NAME,
    db_user:process.env.DB_USER,
    db_password:process.env.DB_PASSWORD,
    port:process.env.PORT || 3000,
};

//Tokens setting 
export const tokenKeys = {
    jwt_secret:process.env.JWT_SECRET,
    refresh_secret:process.env.REFRESH_SECRET
};

// Cookies setting
export const cookiesOption = {
    cookie_httpOnly:true,
    cookie_secure:false,
    cookie_sameSite:process.env.COOKIE_SAMESITE,
    cookie_csrf:true
};

// cors setting 
export const corsOption = {
    origin:process.env.ORIGIN_PORT,// authorized sites
    methods:['GET','POST'],// methods server accepts
    allowedHeaders:['Content-Type','CSRF-Token'],// geader only allowed
    credentials:true // cookies info enable
};

// rate limiter setting
export const rateLimitOption = {
    standardHeaders:true,
    lagacyHeaders:false
};