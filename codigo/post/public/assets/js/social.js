import { SelectImage } from "./selectImage.js";

const selectImage = new SelectImage();

async function selectImages(){
    const users = await selectImage.getUsers();
  console.log("users:", users);
}


window.addEventListener("load", selectImages);