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
    const comments = new CommentsService();
    var keyComment = "comment";

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
        const size = Object.keys(obj).length;
        for (let i = 0; i < size; i++) {
            if (parseInt(obj[i].id) === parseInt(id)) {
                return obj[i].name;
            }
        }
        return '';
    }
    async function getProfilePic(obj, id) {
        const size = Object.keys(obj).length;
        for (let i = 0; i < size; i++) {
            if (parseInt(obj[i].id) === parseInt(id)) {
                return obj[i].profilePhotoUrl;
            }
        }
        return 'https://i.pinimg.com/280x280_RS/e1/5b/cc/e15bcc352225b884d6e7142b3f12a4d1.jpg';
    }
    async function filterCommentsByPostId(postId) {
        const objComments = await getComments();
        let objFiltered = objComments.filter(comment => parseInt(comment.postId ) === parseInt(postId));
        return objFiltered;
    }
    
    var postId = StorageService.loadData(keyComment);
    const objComments = await getComments();
    let objFiltered = await filterCommentsByPostId(postId);
    console.log("objFilt", objFiltered );
    objFiltered.reverse().map(async(currentValue, index)=>{

        const userId = await getUserId(currentValue);
        postId = await getPostId(currentValue); /* leadData from local storage and use this postId */
        const sectionMain = document.querySelector('.comments-container');
        const borderComment = document.createElement('section');
        borderComment.setAttribute("class","section-comment");
        const divImg = document.createElement("div");
        const usersObj = await getUsers();
        const imgProfile = document.createElement("img");
        
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
        sectionMain.appendChild(borderComment);

        

    });
    var idUser = await getUsers();
    const ID = idUser[0].id ;
    const inputElement = document.querySelector('.inputText');
    var idComment, newComment;
    let tam = objComments.length;
    idComment = objComments[tam-1].id;
    idComment++;
    inputElement.addEventListener('input', async (event)=>{
        newComment = {
            id:idComment,
            userId:ID,
            postId:postId,
            comment:event.target.value,
        };

    });
    
    const button = document.querySelector('.share');
    button.addEventListener('click', async()=>{
        await comments.createComment(newComment); 
        location.reload();

    });


});