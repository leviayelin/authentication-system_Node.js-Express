// ===========================
//      app root file 
// ===========================
// import section 
import { renderNavbar } from "./components/navbar.js";
import { router } from "./routes/router.js";

// display data only after finished loading them
document.addEventListener('DOMContentLoaded', ()=>{
    renderNavbar(); // navigation component
    router(); // pages renderer
});

// navigation delegation
// 1.body listen to on all document click event
document.body.addEventListener("click", (e) => {
    // 2.if clicked target gets to tag 'a'
    if (e.target.tagName === "A") {
        // 3.get attribute href 
        const href = e.target.getAttribute("href");
        // 4.check for start char "/"
        if (href.startsWith("/")) {
            e.preventDefault();
            // 6.if true, navigate to clicked link
            window.history.pushState({}, "", href);
            router();
        };
    };
});