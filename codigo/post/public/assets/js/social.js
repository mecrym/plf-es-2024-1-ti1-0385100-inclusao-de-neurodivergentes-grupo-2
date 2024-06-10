import { SelectImageService } from "../../services/selectImage-service.js";
import { PostService } from "../../services/post-service.js";
import { UserService } from "../../services/user-service.js";
document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();

    async function selectPost() {
        const obj = await post.getPosts();
        return obj;
    }
    async function getUrl(array, id) {
        const url = array.photoUrl;
        return url;
    }
    async function getUserId(array, id) {
        const userId = array.userId;
        return userId;
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    function getIndexById(arr, id) {
        return arr.findIndex(item => item.id === id);
    }
    async function getProfilePic(obj, id) {
        const pos = getIndexById(obj, id);
        const profilePic = obj[pos].profilePhotoUrl;
        return profilePic;
    }
    // console.log(await selectPost());
    const object = await selectPost();


    object.map(async (currentValue, index) => {
        const sectionElement = document.querySelector('.content-post');
        const divElement = document.createElement('div');
        divElement.setAttribute("class", "posts");
        const postElement = document.createElement('img');
        postElement.setAttribute("class", "post-img");
        const url = await getUrl(currentValue, index)
        postElement.setAttribute("src", url);
        divElement.appendChild(postElement);
        sectionElement.appendChild(divElement);
        const divProfile = document.createElement("div");
        divProfile.setAttribute("class", "div-profile-pic");
        const usersObj = await getUsers();
        const userId = await getUserId(currentValue, index);
        //console.log(userId);
        //console.log("usersObj: ",usersObj);
        // console.log("urlprofile: ", await getProfilePic(usersObj,userId));

        const urlProfilePic = await getProfilePic(usersObj, userId);
        const section = document.createElement("section");
        section.setAttribute("class","picture-like-comment");
        const profilePic = document.createElement("img");
        profilePic.setAttribute("src", urlProfilePic);
        profilePic.setAttribute("class", "profile-picture");
        divProfile.appendChild(profilePic);
        section.appendChild(divProfile);
        divElement.appendChild(section);
        const divCont = document.createElement("div");
        divCont.setAttribute("class","cont-like-comment");
        const like = document.createElement("img");
        like.setAttribute("src","../assets/images/heart.svg");
        divCont.appendChild(like);
        const comment = document.createElement("img");
        comment.setAttribute("src","../assets/images/comment.svg");
        divCont.appendChild(comment);
        section.appendChild(divCont);

    });

});
