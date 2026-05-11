// Import section 
import { router } from "../routes/router.js";
import { getProfile, logout } from "../services/auth.service.js";

// Navbar Component
export const renderNavbar = async()=>{
    // navbar change based on user logged 
    const navbar = document.getElementById('navbar');
    let isAuth = false;
    try{
        // false status,  print to console everytime user not logged 
        const res = await getProfile();
        if(res?.user){
            isAuth = true
        }
    }catch(err){
        isAuth = false
    }
    if(isAuth){
        // loged-in user navbar
        navbar.innerHTML = `
            <nav class="navbar navbar-expand">
                <div class="container container-md container-sm row hustify-content-left">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/dashboard" id="goDashboard">Dashboard</a></li>
                        <li class="navbar-nav"><button id="logoutBtn" class="btn">logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }else{
        // unloged-in user navbar
        navbar.innerHTML =`
            <nav class="navbar navbar-expand">
                <div class="container container-md container-sm row justify-content-left">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">   
                            <li class="nav-item"><a class="nav-link" href="/login" id="goLogin">Login</a></li>
                            <li class="nav-item"><a class="nav-link" href="/register" id="goRegister">Register</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    };

    // SPA navigation 
    navbar.querySelectorAll("a").forEach(link =>{
        link.addEventListener("click", (e)=>{
            e.preventDefault();

            const path = link.getAttribute("href");
            window.history.pushState({},"",path);
            router();
        });
    });

    // Logout 
    const logoutBtn = document.getElementById('logoutBtn');

    if(logoutBtn){
        logoutBtn.addEventListener('click',async ()=>{
            await logout();
            window.history.pushState({},"","/login");
            router();
        });
    };
};