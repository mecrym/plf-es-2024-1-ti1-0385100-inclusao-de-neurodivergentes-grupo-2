import { UserService } from "../../services/user-service.js";


document.addEventListener('DOMContentLoaded', async function () {
    const user = new UserService();

    async function getUser(id){
        return user.getUser(id);
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    let idUser = await getUsers();
    const ID = idUser[0].id;
    const userAccount = await getUser(ID);
    const img = document.querySelector('.profile-picture>img');
    img.setAttribute("src",userAccount.profilePhotoUrl);
    const inputName = document.querySelector('.name');
    inputName.setAttribute("value", userAccount.name);
    const inputEmail = document.querySelector('.email');
    inputEmail.setAttribute("value", userAccount.email);
    const inputPassword = document.querySelector('.password');
    inputPassword.setAttribute("value", userAccount.password);
    const imgView = document.querySelector('.view>img');
    console.log(imgView);
    imgView.addEventListener('click', ()=>{
        var passwordFieldType = inputPassword.getAttribute('type');
        if (passwordFieldType === 'password') {
            inputPassword.setAttribute('type', 'text');
            imgView.setAttribute("src", "../../assets/images/unview.svg");
        } else {
            inputPassword.setAttribute('type', 'password');
            imgView.setAttribute("src", "../../assets/images/view.svg");
        }

    });
});