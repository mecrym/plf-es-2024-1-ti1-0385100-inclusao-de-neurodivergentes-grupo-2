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
    let idUser = await getUsers();
    const ID = idUser[0].id;
    //console.log("url selected: ",selectImage.getUrlPhoto());
    const url = selectImage.getUrlPhoto();
    const sectionPhoto = document.querySelector('.photo');
    const tagImg = document.createElement("img");
    tagImg.setAttribute("class", "photo-img");
    tagImg.setAttribute("src",url);
    sectionPhoto.appendChild(tagImg);
    const inputElement = document.querySelector('.inputText');
    var  idPost, newPost;
    var contentPost = "";
    const obj = await getPosts();
    idPost = await getIdPost(obj);
    idPost++;
    
    inputElement.addEventListener('input', async (event)=>{
       // console.log('O valor do input mudou para:', event.target.value);
        try {
           
            //console.log('Usuário:', userById);
            
           // console.log("Objeto:", obj);
            contentPost = event.target.value;
            console.log("contentPost", contentPost);
            if(contentPost === undefined) contentPost="";
            console.log("ID do último post:", idPost);
            newPost = {
                id: idPost,
                userId: ID,
                content: contentPost,
                photoUrl: url,
            };
            
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
        
    });

    const button = document.querySelector('.share');
    button.addEventListener('click', async()=>{
        var newPost = {
            id: idPost,
            userId: ID,
            content: contentPost,
            photoUrl: url,
        };
        console.log("newPost", newPost);
        await post.createPost(newPost);
    });

});