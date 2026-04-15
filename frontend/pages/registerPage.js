// ===========================
//      User register page 
// ===========================
// import section 
import { router } from "../routes/router.js";
import { register } from "../services/auth.service.js";
import { setLoading, showMessages, clearMessages } from "../utils/ui.js";
import { registerValidation } from "../utils/validations.js";

export const renderRegister = () =>{
    const app = document.getElementById('app');
    app.innerHTML =`
    <section class="container container-md container-sm">
        <div class="row justify-content-center">  
            <div id="formCard" class="card p-4">
                <form id="registerForm">
                    <div class="form-group mt-4">
                        <label class="mb-2" for="first_name">first name</label>
                        <input id="first_name" class="form-control border border-light-subtle border-2" type="text" name="first_name" placeholder="First name" autocomplete="off" require/>
                    </div>
                    <div class="form-group mt-4">
                        <label class="mb-2" for="last_name">last name</label>
                        <input id="last_name" class="form-control border border-light-subtle border-2" type="text" name="last_name" placeholder="Last name" autocomplete="off" require/>
                    </div>
                    <div class="form-group mt-4">
                        <label class="mb-2" for="email">E-mail address</label>
                        <input id="email" class="form-control border border-light-subtle border-2" type="email" name="email" placeholder="Email" autocomplete="off" require/>
                    </div>
                    <div class="form-group mt-4">
                        <label class="mb-2" for="password">Password</label>
                        <input id="password" class="form-control border border-light-subtle border-2" type="password" name="password" placeholder="Password" autocomplete="off" require/>
                    </div>                
                    <div class="form-group mt-4 d-grid">
                        <button class="btn btn-primary btn-block" type="submit">Register</button>
                    </div>
                </form>
                
                <!-- messages section -->
                <p class="text-center text-danger p-3" id="messages"></p>
            
                <p class="text-center mt-4">Already have an account?
                    <a class="link-underline link-underline-opacity-0" href="/login" id="goLogin">Login</a>
                </p>
            </div>      
        </div>
    </section>
    `;

    const form = document.getElementById('registerForm');
    const messages = document.getElementById('messages');
    const button  = document.querySelector('button');
    
    // submiting form data throgh api to database
    form.addEventListener('submit', async(e)=>{
        e.preventDefault();

        // clear messages 
        clearMessages(messages);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // validation section 
        const error = registerValidation(data);
        if(error){
            showMessages(messages,error);
            return;
        };

        setLoading(button, true);

        try{
            await register(data);
            showMessages(messages, "User created successfully!", "success");
            setTimeout(()=>{
                window.history.pushState({},"","/login");
                router();
            },1000);
        }catch(err){
            showMessages(messages, err.message);
            return;
        }finally{
            setLoading(button, false);
        };        
    });
};