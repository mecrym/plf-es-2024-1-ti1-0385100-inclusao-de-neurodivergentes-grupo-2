import { SelectImageService } from "../../services/selectImage-service.js";
import { PostService } from "../../services/post-service.js";
import { UserService } from "../../services/user-service.js";
import { LikeService } from "../../services/likes-service.js";
import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();
    const likeServ = new LikeService();
    const key = "like";
    const keyComment = "comment";

    async function selectPost() {
        const obj = await post.getPosts();
        return obj;
    }
    async function getUrl(array) {
        const url = array.photoUrl;
        return url;
    }
    async function getUserId(array) {
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
    async function getUserName(obj, id) {
        const pos = getIndexById(obj, id);
        const name = obj[pos].name;
        return name;
    }

    async function getContent(array) {
        const content = array.content;
        return content;
    }
    async function getLikes() {
        const obj = await likeServ.getLikes();
        return obj;
    }
    async function getLastIdLike(obj) {
        var len = obj.length;
        var id = obj[len - 1].id;
        return id;
    }
    async function getLikebyId(obj, id) {
        return await obj.filter(item => item.postId === id);
    }
  

    async function userAlreadyLikedPost(postId, userId) {
        const likes = await getLikes();
        return likes.some(like => like.postId === postId && like.userId === userId);
    }

    const object = await selectPost();
    let idUser = await getUsers();
    const ID = idUser[0].id;
    object.reverse().map(async (currentValue, index) => {
        const sectionElement = document.querySelector('.content-post');
        const divElement = document.createElement('div');
        divElement.setAttribute("class", "posts");
        divElement.setAttribute("id", `post-${index}`);
        const postElement = document.createElement('img');
        postElement.setAttribute("class", "post-img");
        const url = await getUrl(currentValue);
        postElement.setAttribute("src", url);
        divElement.appendChild(postElement);
        sectionElement.appendChild(divElement);

        const divProfile = document.createElement("div");
        divProfile.setAttribute("class", "div-profile-pic");
        const usersObj = await getUsers();
        const userId = await getUserId(currentValue);
        console.log(userId);
        console.log(usersObj[userId].profilePhotoUrl);
        const urlProfilePic = await getProfilePic(usersObj, userId);
        const section = document.createElement("section");
        section.setAttribute("class", "picture-like-comment");
        const sectionUser = document.createElement("section");
        sectionUser.setAttribute("class", "user-profile-name");
        const profilePic = document.createElement("img");
        profilePic.setAttribute("src", urlProfilePic);
        profilePic.setAttribute("class", "profile-picture");
        divProfile.appendChild(profilePic);
        sectionUser.appendChild(divProfile);

        const userName = await getUserName(usersObj, userId);
        const divContent = document.createElement("div");
        divContent.setAttribute("class", "content-div");
        const contentElement = document.createElement("p");
        contentElement.innerHTML = userName;
        divContent.appendChild(contentElement);
        sectionUser.appendChild(divContent);
        section.appendChild(sectionUser);
        divElement.appendChild(section);

        var likesObj = await getLikes();
        var likeArray = await getLikebyId(likesObj, currentValue.id);
        const divCont = document.createElement("div");
        divCont.setAttribute("class", "cont-like-comment");

        const like = document.createElement("img");
        const likeCount = likeArray.length;

        if (await userAlreadyLikedPost(currentValue.id, ID)) {
            like.setAttribute("src", "../assets/images/filled_heart.svg");
        } else {
            like.setAttribute("src", "../assets/images/heart.svg");
        }
        const divLikeHeart = document.createElement("div");
        divLikeHeart.setAttribute("class","like-heart");
        like.setAttribute("class", "like");
        like.setAttribute("id", `like-${index}`);
        divLikeHeart.appendChild(like);
        divCont.appendChild(divLikeHeart);
        
        const likeCountDiv = document.createElement("div");
        likeCountDiv.setAttribute("class", "cont-likes");
        const pLikesElement = document.createElement("p");
        pLikesElement.innerHTML = likeCount;
        likeCountDiv.appendChild(pLikesElement);
        divLikeHeart.appendChild(likeCountDiv);
        divCont.appendChild(divLikeHeart);

        const aElement = document.createElement("a");
        aElement.setAttribute("href", "./comments.html");
        aElement.setAttribute("class", "link-comment");
        const comment = document.createElement("img");
        comment.setAttribute("src", "../assets/images/comment.svg");
        comment.setAttribute("class", "comment");
        aElement.appendChild(comment);
        divCont.appendChild(aElement);
        section.appendChild(divCont);

        const content = await getContent(currentValue);
        const sectionContent = document.createElement("section");
        sectionContent.setAttribute("class", "content");
        const pContent = document.createElement("p");
        pContent.setAttribute("class", "p-like");
        pContent.innerHTML = content;
        sectionContent.appendChild(pContent);
        divElement.appendChild(sectionContent);

        like.addEventListener('click', async (event) => {
            const postId = currentValue.id;
  
            
            if (await userAlreadyLikedPost(postId, ID)) {
                return;
            }

            var objLikes = await getLikes();
            like.setAttribute('data-clicked', 'true');

            const lastIdLike = await getLastIdLike(objLikes);
            var newLike = {
                id: lastIdLike + 1,
                postId: postId,
                userId: ID,
            };
            await likeServ.createLike(newLike);

            pLikesElement.innerHTML = String(Number(pLikesElement.innerHTML) + 1);
            like.setAttribute("src", "../assets/images/filled_heart.svg");

        });

        aElement.addEventListener('click', async()=>{
            const postId = currentValue.id;
            StorageService.saveData(keyComment,postId);

        });
    });
});
