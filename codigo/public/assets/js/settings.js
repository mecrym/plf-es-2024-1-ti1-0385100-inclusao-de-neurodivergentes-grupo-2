import { UserService } from "../../services/user-service.js";
import { StorageService } from '../../services/localStorage-service.js';


document.addEventListener('DOMContentLoaded', async function () {
    const user = new UserService();
    const keyUser = "UI"

    async function getUser(id) {
        return user.getUser(id);
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    const ID = StorageService.loadData(keyUser);

    const userAccount = await getUser(ID);

    const img = document.querySelector('.profile-picture>img');
    img.setAttribute("src", userAccount.profilePhotoUrl);
    const inputName = document.querySelector('.name');
    inputName.setAttribute("value", userAccount.name);
    const inputEmail = document.querySelector('.email');
    inputEmail.setAttribute("value", userAccount.email);
    const inputPassword = document.querySelector('.password');
    inputPassword.setAttribute("value", userAccount.password);
    const imgView = document.querySelector('.view>img');

    const saveBtn = document.querySelector('.button-save');

    imgView.addEventListener('click', () => {
        var passwordFieldType = inputPassword.getAttribute('type');
        if (passwordFieldType === 'password') {
            inputPassword.setAttribute('type', 'text');
            imgView.setAttribute("src", "../../assets/images/unview.svg");
        } else {
            inputPassword.setAttribute('type', 'password');
            imgView.setAttribute("src", "../../assets/images/view.svg");
        }
    });
    saveBtn.addEventListener('click', () => {
        var urlImg = userAccount.profilePhotoUrl;
        var userJSON = {
            id: ID,
            profilePhotoUrl: urlImg,
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        user.updateUser(ID, userJSON);
    });

});