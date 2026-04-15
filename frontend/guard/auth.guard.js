// guard component - simple security layer
// such as: check user access primission/ authorization 
export const requireAuth = () =>{
    return !!localStorage.getItem("token");
};