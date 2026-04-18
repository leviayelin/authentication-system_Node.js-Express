// ===========================
//      User dashboard page 
// ===========================
// Import section 
import { router } from "../routes/router.js";
import { getProfile, logout } from "../services/auth.service.js";

export const renderDashboard = async()=>{
    const app = document.getElementById('app');
    app.innerHTML = "<p>Loading...</p>";

    try{
        // fetch data => if token exists
        const user = await getProfile();
        app.innerHTML = `
        <section>        
            <p class="fs-1 fw-1">welcome <span class="text-primary">${user.user.first_name} ${user.user.last_name}</span></p>
        </section>
        `;
    }catch(err){
        // remove token if expired/not good
        await logout();
        window.history.pushState({},"","/login");
        router();
    };
};