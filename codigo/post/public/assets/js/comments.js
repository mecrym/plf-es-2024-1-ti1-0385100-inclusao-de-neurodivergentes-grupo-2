import { SelectImageService } from "../../services/selectImage-service.js";
import { PostService } from "../../services/post-service.js";
import { UserService } from "../../services/user-service.js";
import { LikeService } from "../../services/likes-service.js";
import { StorageService} from "../../services/localStorage-service.js"
import { CommentsService } from "../../services/comments-service.js"

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();
    const likeServ = new LikeService();
    const storage = new StorageService();
    const comments = new CommentsService();
    

    async function getComments(){
        return await comments.getComments();
    }

    async function getComment(array){
        return await array.comment;
    }
    async function getUserId(array) {
        const userId = array.userId;
        return userId;
    }
    async function getPostId(array) {
        const postId = array.postId;
        return postId;
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    function getIndexById(arr, id) {
        return arr.findIndex(item => item.id === id);
    }
    async function getUserName(obj,id) {
        const pos = getIndexById(obj, id);
        const name = obj[pos].name;
        return name;
    }
    async function getProfilePic(obj, id) {
        const pos = getIndexById(obj, id);
        const profilePic = obj[pos].profilePhotoUrl;
        return profilePic;
    }
    
    const objComments = await getComments();
    console.log(objComments);
    objComments.reverse().map(async(currentValue, index)=>{
        console.log(currentValue);
        const userId = await getUserId(currentValue);
        const postId = await getPostId(currentValue); /* leadData from local storage and use this postId */
        const sectionMain = document.querySelector('.comments-container');
        const borderComment = document.createElement('section');
        borderComment.setAttribute("class","section-comment");
        const divImg = document.createElement("div");
        const usersObj = await getUsers();
        const imgProfile = document.createElement("img");
        console.log(usersObj);
        console.log(userId);
        
        const profilePicture = await getProfilePic(usersObj,userId);
        imgProfile.setAttribute("src", profilePicture);
        divImg.appendChild(imgProfile);
        const name = await getUserName(usersObj,userId);
        const divNameComment = document.createElement("div");
        divNameComment.setAttribute("class","name-comment");
        const divName = document.createElement("div");
        divName.setAttribute("class","name-user");
        const nameElement = document.createElement("p");
        nameElement.innerHTML = name;
        divName.appendChild(nameElement);
        divNameComment.appendChild(divName);
        const divComment = document.createElement("div");
        divComment.setAttribute("class","comment-user");
        const commentElement = document.createElement("p");
        commentElement.innerHTML = await getComment(currentValue);
        divComment.appendChild(commentElement);
        divNameComment.appendChild(divComment);
        borderComment.appendChild(divImg);
        borderComment.appendChild(divNameComment);
       //const divContainer = document.createElement("div");
       // divContainer.setAttribute("class","container");
       // divContainer.appendChild(borderComment);
        sectionMain.appendChild(borderComment);
        

    });


});