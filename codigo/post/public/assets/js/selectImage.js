import { SelectImage } from "../../services/selectImage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImage();

    async function selectImages(pos) {
        return await selectImage.getPhoto(pos);
    }
   
    
    var sectionFirstPhoto = document.querySelector('.main-photo');
    const firstPhoto = document.createElement("img");
    const photoUrl = await selectImages(4);
    firstPhoto.setAttribute("src", photoUrl || 'default-image-url'); 
    firstPhoto.setAttribute("width", "100%"); 
    firstPhoto.setAttribute("height", "100%");
    sectionFirstPhoto.appendChild(firstPhoto);


    var sectionPhotos = document.querySelector('.wrapper'); 
    const positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const element =  positions.map(async pos=>{
        const div = document.createElement("div");
       /* div.setAttribute("width", "100%");
        div.setAttribute("height", "10vh");*/
        div.setAttribute("class", "wrapper-item");   
        const img = document.createElement("img");
        const photo = await selectImages(pos);
        img.setAttribute("src", photo);
        div.appendChild(img);
        sectionPhotos.append(div);
    });


   
/*
    var sectionPhotos = document.querySelector('.wrapper'); 
    const secPhoto = document.createElement("img");
    secPhoto.setAttribute("src", photoUrl || 'default-image-url'); 
    secPhoto.setAttribute("width", "100%"); 
    secPhoto.setAttribute("height", "100%");
    sectionPhotos.appendChild(secPhoto);*/
    

});
