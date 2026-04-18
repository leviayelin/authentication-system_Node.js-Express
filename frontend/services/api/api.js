// API Service : Login, Register, Dashboard
// =============================================
// fetching api 
export const apiFetch = async(url, option={})=>{
    const res = await fetch(url,{
        // methods
        ...option,
        credentials: "include",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const data = await res.json();
    // error handling
    if(!res.ok) throw new Error (data.error || "Request Failed");
    return data;
};