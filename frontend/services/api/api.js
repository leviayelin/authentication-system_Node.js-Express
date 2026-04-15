// API Service : Login, Register, Dashboard
// =============================================
// fetching api 
export const apiFetch = async(url, option={})=>{
    // trying to get token from localStorage
    const token = localStorage.getItem("token");

    const res = await fetch(url,{
        // methods
        ...option,
        headers:{
            "Content-Type":"application/json",
            ...(token && {Authorization:"Bearer "+ token})
            // work like: 
            // if (token) {
            //     headers.Authorization = "Bearer " + token;
            // }
        }
    });

    const data = await res.json();
    // error handling
    if(!res.ok) throw new Error (data.error || "Request Failed");

    return data;
};