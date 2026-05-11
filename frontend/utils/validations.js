// ==================================
// Utilities - validations
// ==================================
// regex - curret format for email
const validationEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Login validation
export const loginValidation = ({email,password}) =>{
    if(!email || !password){
        return "All fields are required!";
    };

    if(!validationEmail(email)){
        return "Invalid email format";
    };

    if(password.length < 6){
        return "Password must be at least 6 characters";
    };
    return null;
};

// Register Validation 
export const registerValidation = ({first_name,last_name,email,password})=>{
    if(!first_name || !last_name || !email || !password){
        return "All fields are required";
    };

    if(!validationEmail(email)){
        return "Invalid email format"
    };

    if(password.length < 6){
        return "Password must be at least 6 characters";
    };
    return null; 
};

// the top utility is instead of this code:

// empty fields
// if(!email || !password){
//     messages.textContent = "All fileds are required";
//     button.disabled = false;
//     button.textContent = "Login";
//     return 
// };
// // password requirements
// if(password.length < 6){
//     messages.textContent = "Password must be at least 6 characters";
//     button.disabled = false;
//     button.textContent = "Login";
//     return
// };