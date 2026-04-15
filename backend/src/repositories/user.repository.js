// import section 
import {pool} from '../db/db.js'

// Register - creating new user
export const createUser = async(first_name,last_name,email,password_hash)=>{
    const result = await pool.query(
        `INSERT INTO users(first_name,last_name,email,password_hash)
         VALUES($1,$2,$3,$4) 
         RETURNING *`,
         [first_name,last_name,email,password_hash]);
    return result.rows[0];
}; 

// Login - user login
export const getUserByEmail = async(email)=>{
    const result = await pool.query(`
        SELECT * FROM users
        WHERE email=$1 
        `,[email])
        return result.rows[0];
};

// get user by id
export const findUserById = async (id)=>{
    const  result = await pool.query(`
        SELECT first_name,last_name,email FROM users
        WHERE id=$1
        `,[id]);
        return result.rows[0];
};