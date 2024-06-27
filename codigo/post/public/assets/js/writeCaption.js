import { SelectImageService } from "../../services/selectImage-service.js";
import {PostService} from "../../services/post-service.js";
import {UserService} from "../../services/user-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();

    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    async function getUserId(id){
        const array = await user.getUser(id);
        return array.id;
    }
    async function getPosts(){
        return await post.getPosts();
    }
    async function getIdPost(obj){
        const len = obj.length;
        const getId = obj[len-1].id;
        return getId;
    }
    async function getPosts() {
        return await post.getPosts();    
    }


    const posts = await getPosts();
    var lenPosts = posts.length;
    var idLastPost = parseInt(posts[lenPosts-1].id);

    let idUser = await getUsers();
    const ID = idUser[0].id;
    
    const url = posts[lenPosts-1].photoUrl;
    const sectionPhoto = document.querySelector('.photo');
    const tagImg = document.createElement("img");
    tagImg.setAttribute("class", "photo-img");
    tagImg.setAttribute("src",url);
    sectionPhoto.appendChild(tagImg);
    const inputElement = document.querySelector('.inputText');
    var contentPost = "";
  
    inputElement.addEventListener('input', async (event)=>{
        try {
            
            contentPost = event.target.value;

            if(contentPost === undefined) contentPost="";
          
            
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
        
    });

    const button = document.querySelector('.share');
    button.addEventListener('click', async()=>{
        console.log("input value", inputElement.value);
        var newPost = {
            id: idLastPost,
            userId: ID,
            content: inputElement.value,
            photoUrl: url,
        };
     
        await post.updatePost(idLastPost,newPost);
    });

});