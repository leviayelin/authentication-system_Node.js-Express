// =============================================
// API Service : Login, Register, Dashboard
// =============================================
// Import section
import { getCsrfToken } from "../csrf.service.js"; 

// fetching api 
export const apiFetch = async(url, options={})=>{
    const method = options.method || "GET";

    let headers = {
        "Content-Type":"application/json"
    };

    // cross-origin request
    if(method !== "GET"){
        const csrfToken = await getCsrfToken();
        headers["CSRF-Token"] = csrfToken;
    };
    
    let res = await fetch(url,{
        // methods
        ...options,
        credentials: "include",
        headers
    });
    
    // eccess token expired
    if(res.status === 401 && !options._retry){
        // if(url.includes("/refresh")){
        //     throw new Error("Session expired");
        // };

        // prevent infinite loop
        options._retry = true;
        
        // refresh attempts
        const refreshRes = await fetch("http://localhost:3000/api/auth/refresh",{
            method:"POST",
            credentials:"include"
        });

        // if success
        if(refreshRes.ok){
            res = await fetch(url,{
                ...options,
                credentials:"include",
                headers
            });
        }else{
            throw new Error("Session expired");
        };
    };
    const data = await res.json();
    // error handling
    if(!res.ok) throw new Error (data.error || "Request Failed");
    return data;
};