// ===========================
//      Router - page routes 
// ===========================
// import section 
import { renderDashboard } from "../pages/dashboardPage.js";
import { renderLogin } from "../pages/loginPage.js";
import { renderRegister } from "../pages/registerPage.js";
import { renderNavbar } from "../components/navbar.js";
import { authRequirment } from "../utils/authentication.js";

// setting routes 
const routes = {
    "/":renderLogin,
    "/login":renderLogin,
    "/register":renderRegister,
    "/dashboard":renderDashboard
};

// router 
export const router = () =>{
    renderNavbar();
    // getting url path
    const path = window.location.pathname;
    // protected dashboard access requirment
    if(path === '/dashboard' && !authRequirment){
        // re-route if requirements not met 
        window.history.pushState({},"","/login");
        return renderLogin();
    };

    // render to page by path
    const page = routes[path];
    
    // conditons
    page ? page() : renderLogin();
};