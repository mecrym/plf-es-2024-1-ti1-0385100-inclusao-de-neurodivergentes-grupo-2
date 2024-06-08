import { SelectImage } from "./selectImage.js";

const selectImage = new SelectImage();

async function selectImages(){
  
    const photo = await selectImage.getPhoto(0);
    

}


window.addEventListener("load", selectImages);