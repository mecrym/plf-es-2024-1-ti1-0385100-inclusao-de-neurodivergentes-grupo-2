import { SelectImage } from "../../services/selectImage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImage();
    console.log("url selected: ",selectImage.getUrlPhoto());
});