// Import section
import { getProfile } from "../services/auth.service.js"; 

// authentication requirments 
export const authRequirment = async ()=>{
    try{
        const userProfile = await getProfile();
        return !!userProfile.user
    }catch(err){
        return null
    }
};

