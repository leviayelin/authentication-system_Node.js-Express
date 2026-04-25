// import section 
import 'dotenv/config'

// env setting 
export const env = {
    db_port:process.env.DB_PORT,
    db_host:process.env.DB_HOST,
    db_name:process.env.DB_NAME,
    db_user:process.env.DB_USER,
    db_password:process.env.DB_PASSWORD,
    port:process.env.PORT || 3000,
    jwt_secret:process.env.JWT_SECRET,
    ref_secret:process.env.REFRESH_SECRET
};

// cors setting 
export const corsOption = {
    origin:process.env.ORIGIN_PORT,// authorized sites
    methods:['GET','POST'],// methods server accepts
    allowedHeaders:['Content-Type','CSRF-Token'],// geader only allowed
    credentials:true // cookies info enable
};