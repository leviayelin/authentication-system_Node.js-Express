// import section 
import {pool} from '../db/db.js'

// User registration: save user information
export const createUser = async(first_name,last_name,email,password_hash)=>{
    const result = await pool.query(
        `INSERT INTO users(first_name,last_name,email,hash_password)
         VALUES($1,$2,$3,$4) 
         RETURNING *`,
         [first_name,last_name,email,password_hash]);
    return result.rows[0];
}; 

// User authentication (login) : get user by email
export const getUserByEmail = async(email)=>{
    const result = await pool.query(`
        SELECT * FROM users
        WHERE email=$1 
        `,[email]);
    return result.rows[0];
};

// protected pages (dashboard) : get user by id
export const findUserById = async (id)=>{
    const  result = await pool.query(`
        SELECT first_name,last_name,email FROM users
        WHERE id=$1
        `,[id]);
        return result.rows[0];
};

// refresh token rotation : save refresh token (whene success login)
export const saveRefreshToken = async({userId,token,expireAt})=>{
    await pool.query(`
    INSERT INTO refresh_tokens(user_id,token, expires_at)
    VALUES($1,$2,$3)`,[userId,token,expireAt]);
};

// refresh token rotation : get user refresh token
export const getUserRefreshToken = async(userId)=>{
    const result = await pool.query(`
    SELECT id,user_id,token,expires_at FROM refresh_tokens
    WHERE user_id=$1`,[userId]);
    return result.rows;    
};

// refresh token rotation : delete old refresh token 
export const deleteRefreshToken = async(tokenId)=>{
    await pool.query(`
    DELETE FROM refresh_tokens
    WHERE id=$1`,[tokenId]);
};

// refresh token rotation (reuse detection) : delete all users token
export const deleteAllUsersTokens = async(userId)=>{
    await pool.query(`
    DELETE FROM refresh_tokens
    WHERE user_id=$1`,[userId]);
};