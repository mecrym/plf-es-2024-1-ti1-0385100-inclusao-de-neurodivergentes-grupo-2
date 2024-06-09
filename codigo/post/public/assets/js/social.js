import { SelectImageService } from "../../services/selectImage-service.js";
import {PostService} from "../../services/post-service.js";
import {UserService} from "../../services/user-service.js";
document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();

    async function selectPost(){
      
        const obj = await post.getPosts();
        return obj;
    }
    console.log(await selectPost());
    const sectionElement = document.querySelector('.content-post');
    const postElement = document.createElement('img');
    
   // window.addEventListener("load", selectPost); 
});
