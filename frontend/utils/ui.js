// button halper - 
// note: help preventing breaking of code by multipol clicking 
export const setLoading = (button, isLoading  ) =>{
    button.disabled = isLoading;
    button.textContent = isLoading ? "Loading..." : "Login" ;
};

//  messages - show message
export const showMessages = (el, text, type="error") =>{
    el.textContent = text;
    el.style.color = type === "error" ?"red":"green";
};

// message - clear message
export const clearMessages = (el) =>{
    el.textContent = "";
}
