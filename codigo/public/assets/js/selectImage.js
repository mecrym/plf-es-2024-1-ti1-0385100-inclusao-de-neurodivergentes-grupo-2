import { SelectImageService } from "../../services/selectImage-service.js";
import { PostService } from "../../services/post-service.js";
import { UserService } from "../../services/user-service.js";
import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();
    const keyUser = "UI";

    async function getUser(id) {
        return user.getUser(id);
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }

    async function getPost(id) {
        return post.getPost(id);
    }
    async function getPosts() {
        return await post.getPosts();    
    }
    async function selectImages(pos) {
        return await selectImage.getPhoto(pos);
    }
    
    const ID = StorageService.loadData(keyUser);
    const userAccount = await getUser(ID);

    let idLastPost = await getPosts();
    var lenPosts = idLastPost.length;
    idLastPost = parseInt(idLastPost[lenPosts-1].id) +1;
    
 
    var sectionPhotos = document.querySelector('.wrapper');

    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const mainPhoto = document.querySelector('.main-photo');
    const tagPhoto = document.createElement('img');
    var photo = await selectImages(0);
    tagPhoto.setAttribute("src", photo);
    mainPhoto.appendChild(tagPhoto);

    positions.map(async pos => {
        const div = document.createElement("div");
        div.setAttribute("class", "wrapper-item");
        div.setAttribute("id", pos);
        const img = document.createElement("img");
        selectImage.setQuery('Gym');
        const photo = await selectImages(pos);
        img.setAttribute("src", photo);
        div.appendChild(img);
        sectionPhotos.append(div);


        var photoUrl = await selectImages(pos);
        if (pos == 0) {
            var firstImg = document.querySelector(`[id="${pos}"]>img`);
            firstImg.setAttribute("class", "selected ");
            /*
            const check = document.createElement('div');
            check.setAttribute("class", "check position-absolute top-0 end-0");
            const imgCheck = document.createElement('img');
            imgCheck.setAttribute("src", "../../assets/images/check.svg");
            check.appendChild(imgCheck);
            div.appendChild(check);*/
        }
        div.addEventListener('click', async () => {

            var sectionPhotos = document.querySelector('.main-photo');
            var photo = document.querySelector(".main-photo>img");
            var photoSelected = document.querySelector(`[id="${pos}"]>img`);
            photoUrl = await selectImages(pos);
            photo.setAttribute("src", photoUrl);
            const photoBefore = document.querySelector(`.selected`);
            photoSelected.setAttribute("class", "selected position-relative");


            sectionPhotos.appendChild(photo);
            if (photoBefore) {
                photoBefore.removeAttribute("class");
            }

        });


    });


    
    const buttonNext = document.querySelector(".next");
    buttonNext.addEventListener('click', async () => {
        var infoJSON = {
            id: idLastPost.toString(),
            userId: parseInt(userAccount.id),
            content: '',
            photoUrl: tagPhoto.getAttribute("src")
         
        };

        post.createPost(infoJSON);
    });


});
