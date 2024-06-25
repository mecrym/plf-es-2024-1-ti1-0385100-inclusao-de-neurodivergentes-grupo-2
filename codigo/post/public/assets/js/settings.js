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
});