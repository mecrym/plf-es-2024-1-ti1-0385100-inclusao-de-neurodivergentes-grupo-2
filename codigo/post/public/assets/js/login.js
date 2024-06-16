import {UserService} from "../../services/user-service.js";
import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {

    const user = new UserService();
    
    
    const buttonLogin = document.querySelector('.button-login');
    buttonLogin.addEventListener('click', async(event)=>{
        event.preventDefault();
        const button = document.querySelector('.button-login');
        const typeEmail = document.querySelector('.email');
        const typePass = document.querySelector('.password');
        const email = document.querySelector('.email').value;
        console.log(email);
        const password = document.querySelector('.password').value;
        console.log(password);
        const users = await user.getUsers();
        console.log("users: ", await user.getUsers());
        const result = users.filter(mail=> mail.email===email);
        console.log("result: ", result);
        const resultPass =  users.filter(pass=> pass.password===password);
        if(result.length === 0 || resultPass === 0){
            console.log("Email ou senha errado");
            button.style.color = "#D21010";
            button.style.borderColor = "#D21010";
        }else{
            console.log("Credenciais corretas!");
            window.location.href = "./social.html";
        }
        typeEmail.addEventListener('input',async =>{
            button.style.color = "#FFC700";
            button.style.borderColor = "#FFC700";
        });
        typePass.addEventListener('input',async =>{
            button.style.color = "#FFC700";
            button.style.borderColor = "#FFC700";
        });
        
        
      
   });

});
