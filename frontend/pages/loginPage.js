// ===========================
//      user login page 
// ===========================
// import section 
import { router } from "../routes/router.js";
import { login } from "../services/auth.service.js";
import { showMessages, setLoading, clearMessages } from "../utils/ui.js";
import { loginValidation } from "../utils/validations.js";

export const renderLogin = () =>{
    const app = document.getElementById('app');
    app.innerHTML =`
    <section class="container container-md container-sm">
        <div class="row justify-content-center">
            <div id="formCard" class="card p-4">    
                <form id="loginForm">
                    <div class="form-group mt-4">
                        <label class="mb-2" for="email">E-mail address</label>
                        <input id="email" class="form-control border border-light-subtle border-2" type="email" name="email" placeholder="Email" autocomplete="off" required/>
                    </div>
                    <div class="form-group mt-4">
                        <label class="mb-2" for="password">Password</label>
                        <input id="password" class="form-control border border-light-subtle border-2" type="password" name="password" placeholder="Password" aurocomplete="off" required/>    
                    </div>
                    <div class="form-group mt-4">
                        <button class="btn btn-primary btn-block" type="submit">Login</button>
                    </div>    
                </form>
                
                <!-- messages section --> 
                <p class="text-center text-danger m-4" id="messages"></p>

                <p class="text-center mt-4">Don't have an account?
                    <a class="link-underline link-underline-opacity-0" id="goRegister" href="/register">Register</a>
                </p>
            </div>
        </div>
    </section>
    `;

    // selectors section 
    const form = document.getElementById("loginForm");
    const messages = document.getElementById('messages'); 
    const button = document.querySelector('button');
    
    // submiting form throgh api to database
    form.addEventListener('submit', async(e)=>{
        e.preventDefault();
        
        // clear messages
        clearMessages(messages); 
        
        // creating new  object of form data 
        const formData = new FormData(form);
        // attached field data to veriable 
        const data = Object.fromEntries(formData);
        //note: use object.fromEntries() get's all filed values -
        // const data = {
        //     email:formData.get("email"),
        //     password:formData.get("password")
        // };

        // validation section 
        const error = loginValidation(data);
        if(error){
            showMessages(messages, error);
            return ;
        };

        setLoading(button, true);

        try{
            // get token throgh auth login service api 
            await login(data);
            window.history.pushState({},"","/dashboard");
            router();
        }catch(err){
            showMessages(messages,err.message);
            return;
        }finally{
            setLoading(button, false);
        };
    });
};