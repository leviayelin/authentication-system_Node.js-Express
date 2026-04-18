// ===========================
// api authentication service
// ===========================
// Import section 
import { apiFetch } from "./api/api.js";
import { API_URL } from "../config/api_url.js";

// login api service
export const login = async(data)=>{
    try{
        return apiFetch(`${API_URL}/auth/login`,{
            method:"POST",
            body:JSON.stringify(data)
        });
    }catch(err){
        console.log(`Failed to login: ${err.message}`);
        return null;
    };
};

// register api service
export const register = async(data)=>{
    try{
        return await apiFetch(`${API_URL}/auth/register`,{
            method:'POST',
            body:JSON.stringify(data)
        });
    }catch(err){
        console.log(`Faield to register: ${err.message}`);
        return null;
    };
};

// get dashBoard/profile
export const getProfile = async()=>{
    try{
        return await apiFetch(`${API_URL}/auth/profile`);
    }catch(err){
        console.log(`Failed to fetch data ${err.message}`);
        return null;
    };
};

// logout 
export const logout = async()=>{
    return await apiFetch(`${API_URL}/auth/logout`,{
        method:"POST"
    });
};