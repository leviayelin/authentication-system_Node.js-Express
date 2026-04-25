// Import section 
import { API_URL } from "../config/api_url.js";

// CSRF Token 
export const getCsrfToken = async ()=>{
    const res = await fetch(`${API_URL}/auth/csrf-token`,{
        credentials:"include"
    });

    const data = await res.json();
    return data.csrfToken;
};