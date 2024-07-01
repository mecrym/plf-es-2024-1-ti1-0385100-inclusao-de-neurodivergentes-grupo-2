import { TaskService } from "../../services/tasks-service.js";
import { CategoriesService } from "../../services/categories-service.js";
import { StorageService } from "../../services/localStorage-service.js"

document.addEventListener('DOMContentLoaded', async function () {
    const task = new TaskService();
    const category = new CategoriesService();
    var keyTask = "taskId";
    var keyUser = "UI";

    async function getCategory(id) {
        return await category.getCategories(id);
    }
    async function getTask(id) {
        return await task.getTask(id);
    }
    async function getTasks() {
        return await task.getTasks();
    }
    async function getTasksById(obj, id) {
        return obj.filter(entry => parseInt(entry.userId) === parseInt(id));
    }
    async function getPeriodDay(obj) {
        var timeString = obj.startTime;
        if (!timeString || timeString === 'null') return 'Fulltime';

        var [hour] = timeString.split(":");
        hour = parseInt(hour, 10);

        if (hour >= 6 && hour < 12) return 'Morning';
        else if (hour >= 12 && hour < 18) return 'Afternoon';
        else if (hour >= 18 && hour < 21) return 'Evening';
        else return 'Night';

    }
    function getCategoryNameById(obj, id) {
        const category = obj.find(category => parseInt(category.id) === parseInt(id));
        return category ? category.name : null;
    }
    async function getImageCategory(id) {
        const objCategory = await getCategory(id);
        const name = getCategoryNameById(objCategory, id);
        console.log('name', name);
        console.log("objCategory", objCategory);
        console.log("id", id);
        switch (name) {
            case "Sports":
                return '../../assets/images/dumbbell.png';
            case "Health":
                return '../../assets/images/health.png';
            case "Nutrition":
                return '../../assets/images/nutrition.png';
            case "Study":
                return '../../assets/images/study.png';
            case "Entertainment":
                return '../../assets/images/entertainment.png';
            case "Finance":
                return '../../assets/images/finance.png';
            case "Art":
                return '../../assets/images/art.png';
            case "Work":
                return '../../assets/images/work.png';
            case "Home":
                return '../../assets/images/home.png';
            case "BadHabit":
                return '../../assets/images/bad-habit.png';
            case "Read":
                return '../../assets/images/read.png';
            case "Other":
                return '../../assets/images/other.png';
        }
    }
    async function getColorCategory(id) {
        const objCategory = await getCategory(id);
        const name = getCategoryNameById(objCategory, id);
        console.log('name', name);
        console.log("objCategory", objCategory);
        console.log("id", id);
        switch (name) {
            case "Sports":
                return '#FF5C00';
            case "Health":
                return '#4AA633';
            case "Nutrition":
                return '#FF9A51';
            case "Study":
                return '#594CEE';
            case "Entertainment":
                return '#9E00FF';
            case "Finance":
                return '#FFC700';
            case "Art":
                return '#FF017B';
            case "Work":
                return '#34FF9D';
            case "Home":
                return '#818260';
            case "BadHabit":
                return '#FD6161';
            case "Read":
                return '#2AFFD9';
            case "Other":
                return '#EF31C6';
        }
    }


    const idTask = StorageService.loadData(keyTask);
    const userId = StorageService.loadData(keyUser);
    var objTasks = await getTasks();
    objTasks = await getTasksById(objTasks, userId);
    console.log("obj", objTasks);


    var contMorning = false;
    var contAfternoon = false;
    var contEvening = false;
    var contNigth = false;
    var contFulltime = false;
    objTasks.map(async (currentValue, index) => {
    
        const section = document.querySelector('.cards');
        const periodDay = await getPeriodDay(currentValue);

        if (periodDay === 'Fulltime') {
            if (!contFulltime) {
                contFulltime = true;
                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'title');
                const mainTitle = document.createElement('h1');

                mainTitle.innerHTML = periodDay;
                const dateTask = document.createElement('p');
                dateTask.innerHTML = currentValue.startDate;
                divTitle.appendChild(mainTitle);
                divTitle.appendChild(dateTask);
                section.appendChild(divTitle);



            }

            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            const divInt = document.createElement('div');
            divInt.setAttribute("class", "container");

            const divCat = document.createElement('div');
            divCat.setAttribute("class", "divImg");

            const categoryId = currentValue.categoryId;
            console.log("curentValue", currentValue);
            console.log("categoryId", categoryId);
            const urlImg = await getImageCategory(categoryId);

            const divImgCard = document.createElement('div');
            divImgCard.setAttribute("class", "border-img");
            divImgCard.style.backgroundColor = await getColorCategory(categoryId);
            const img = document.createElement('img');
            img.setAttribute("src", urlImg);
           
            const nameTag = document.createElement('p');
            var title = currentValue.title;
            if (title.toLowerCase() === 'add your title') {
                const objCategory = await getCategory(categoryId);
                title = getCategoryNameById(objCategory, categoryId);

            }
            nameTag.innerHTML = title;

            if(currentValue.priority){
                divCard.style.position = 'relative';
                const importanceDiv = document.createElement('div');
                importanceDiv.setAttribute('class', 'importance');
                importanceDiv.style.position = 'absolute';
                divCard.appendChild(importanceDiv);

            }

            divImgCard.appendChild(img);
            divCat.appendChild(divImgCard);
            divCat.appendChild(nameTag);
            divInt.appendChild(divCat);

            const divBtn = document.createElement('div');
            divBtn.setAttribute("class", "container-button");

            const btn = document.createElement("button");
            btn.setAttribute("class", "add");
            btn.setAttribute("id", "addText");
            btn.setAttribute("onclick", "window.location.href='../../view/registrationChange.html'");

            const imgBtn = document.createElement("img");
            imgBtn.setAttribute("id", "imgBtn");
            imgBtn.setAttribute("src", "../../assets/images/plus_icon.svg");

            btn.appendChild(imgBtn);
            divBtn.appendChild(btn);
            divInt.appendChild(divBtn);
            divCard.appendChild(divInt);
            section.appendChild(divCard);
        }
        else if (periodDay === 'Morning') {
            if (!contMorning) {
                contMorning = true;
                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'title');
                const mainTitle = document.createElement('h1');

                mainTitle.innerHTML = periodDay;
                const dateTask = document.createElement('p');
                dateTask.innerHTML = currentValue.startDate;
                divTitle.appendChild(mainTitle);
                divTitle.appendChild(dateTask);
                section.appendChild(divTitle);

            }
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            const divInt = document.createElement('div');
            divInt.setAttribute("class", "container");

            const divCat = document.createElement('div');
            divCat.setAttribute("class", "divImg");

            const categoryId = currentValue.categoryId;
            console.log("curentValue", currentValue);
            console.log("categoryId", categoryId);
            const urlImg = await getImageCategory(categoryId);

            const divImgCard = document.createElement('div');
            divImgCard.setAttribute("class", "border-img");
            divImgCard.style.backgroundColor = await getColorCategory(categoryId);
            const img = document.createElement('img');
            img.setAttribute("src", urlImg);
           
            const nameTag = document.createElement('p');
            var title = currentValue.title;
            if (title.toLowerCase() === 'add your title') {
                const objCategory = await getCategory(categoryId);
                title = getCategoryNameById(objCategory, categoryId);

            }
            nameTag.innerHTML = title;

            if(currentValue.priority){
                divCard.style.position = 'relative';
                const importanceDiv = document.createElement('div');
                importanceDiv.setAttribute('class', 'importance');
                importanceDiv.style.position = 'absolute';
                divCard.appendChild(importanceDiv);

            }

            divImgCard.appendChild(img);
            divCat.appendChild(divImgCard);
            divCat.appendChild(nameTag);
            divInt.appendChild(divCat);

            const divBtn = document.createElement('div');
            divBtn.setAttribute("class", "container-button");

            const btn = document.createElement("button");
            btn.setAttribute("class", "add");
            btn.setAttribute("id", "addText");
            btn.setAttribute("onclick", "window.location.href='../../view/registrationChange.html'");

            const imgBtn = document.createElement("img");
            imgBtn.setAttribute("id", "imgBtn");
            imgBtn.setAttribute("src", "../../assets/images/plus_icon.svg");

            btn.appendChild(imgBtn);
            divBtn.appendChild(btn);
            divInt.appendChild(divBtn);
            divCard.appendChild(divInt);
            section.appendChild(divCard);
        }
        else if (periodDay === 'Afternoon') {
            if (!contAfternoon) {
                contAfternoon = true;
                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'title');
                const mainTitle = document.createElement('h1');

                mainTitle.innerHTML = periodDay;
                const dateTask = document.createElement('p');
                dateTask.innerHTML = currentValue.startDate;
                divTitle.appendChild(mainTitle);
                divTitle.appendChild(dateTask);
                section.appendChild(divTitle);

            }
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            const divInt = document.createElement('div');
            divInt.setAttribute("class", "container");

            const divCat = document.createElement('div');
            divCat.setAttribute("class", "divImg");

            const categoryId = currentValue.categoryId;
            console.log("curentValue", currentValue);
            console.log("categoryId", categoryId);
            const urlImg = await getImageCategory(categoryId);

            const divImgCard = document.createElement('div');
            divImgCard.setAttribute("class", "border-img");
            divImgCard.style.backgroundColor = await getColorCategory(categoryId);
            const img = document.createElement('img');
            img.setAttribute("src", urlImg);
           
            const nameTag = document.createElement('p');
            var title = currentValue.title;
            if (title.toLowerCase() === 'add your title') {
                const objCategory = await getCategory(categoryId);
                title = getCategoryNameById(objCategory, categoryId);

            }
            nameTag.innerHTML = title;

            if(currentValue.priority){
                divCard.style.position = 'relative';
                const importanceDiv = document.createElement('div');
                importanceDiv.setAttribute('class', 'importance');
                importanceDiv.style.position = 'absolute';
                divCard.appendChild(importanceDiv);

            }

            divImgCard.appendChild(img);
            divCat.appendChild(divImgCard);
            divCat.appendChild(nameTag);
            divInt.appendChild(divCat);

            const divBtn = document.createElement('div');
            divBtn.setAttribute("class", "container-button");

            const btn = document.createElement("button");
            btn.setAttribute("class", "add");
            btn.setAttribute("id", "addText");
            btn.setAttribute("onclick", "window.location.href='../../view/registrationChange.html'");

            const imgBtn = document.createElement("img");
            imgBtn.setAttribute("id", "imgBtn");
            imgBtn.setAttribute("src", "../../assets/images/plus_icon.svg");

            btn.appendChild(imgBtn);
            divBtn.appendChild(btn);
            divInt.appendChild(divBtn);
            divCard.appendChild(divInt);
            section.appendChild(divCard);

        }
        else if (periodDay === 'Evening') {
            if (!contEvening) {
                contEvening = true;
                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'title');
                const mainTitle = document.createElement('h1');

                mainTitle.innerHTML = periodDay;
                const dateTask = document.createElement('p');
                dateTask.innerHTML = currentValue.startDate;
                divTitle.appendChild(mainTitle);
                divTitle.appendChild(dateTask);
                section.appendChild(divTitle);

            }
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            const divInt = document.createElement('div');
            divInt.setAttribute("class", "container");

            const divCat = document.createElement('div');
            divCat.setAttribute("class", "divImg");

            const categoryId = currentValue.categoryId;
            console.log("curentValue", currentValue);
            console.log("categoryId", categoryId);
            const urlImg = await getImageCategory(categoryId);

            const divImgCard = document.createElement('div');
            divImgCard.setAttribute("class", "border-img");
            divImgCard.style.backgroundColor = await getColorCategory(categoryId);
            const img = document.createElement('img');
            img.setAttribute("src", urlImg);
           
            const nameTag = document.createElement('p');
            var title = currentValue.title;
            if (title.toLowerCase() === 'add your title') {
                const objCategory = await getCategory(categoryId);
                title = getCategoryNameById(objCategory, categoryId);

            }
            nameTag.innerHTML = title;

            if(currentValue.priority){
                divCard.style.position = 'relative';
                const importanceDiv = document.createElement('div');
                importanceDiv.setAttribute('class', 'importance');
                importanceDiv.style.position = 'absolute';
                divCard.appendChild(importanceDiv);

            }

            divImgCard.appendChild(img);
            divCat.appendChild(divImgCard);
            divCat.appendChild(nameTag);
            divInt.appendChild(divCat);

            const divBtn = document.createElement('div');
            divBtn.setAttribute("class", "container-button");

            const btn = document.createElement("button");
            btn.setAttribute("class", "add");
            btn.setAttribute("id", "addText");
            btn.setAttribute("onclick", "window.location.href='../../view/registrationChange.html'");

            const imgBtn = document.createElement("img");
            imgBtn.setAttribute("id", "imgBtn");
            imgBtn.setAttribute("src", "../../assets/images/plus_icon.svg");

            btn.appendChild(imgBtn);
            divBtn.appendChild(btn);
            divInt.appendChild(divBtn);
            divCard.appendChild(divInt);
            section.appendChild(divCard);
        }
        else {
            if (!contNigth) {
                contNigth = true;
                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'title');
                const mainTitle = document.createElement('h1');

                mainTitle.innerHTML = periodDay;
                const dateTask = document.createElement('p');
                dateTask.innerHTML = currentValue.startDate;
                divTitle.appendChild(mainTitle);
                divTitle.appendChild(dateTask);
                section.appendChild(divTitle);

            }
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            const divInt = document.createElement('div');
            divInt.setAttribute("class", "container");

            const divCat = document.createElement('div');
            divCat.setAttribute("class", "divImg");

            const categoryId = currentValue.categoryId;
            console.log("curentValue", currentValue);
            console.log("categoryId", categoryId);
            const urlImg = await getImageCategory(categoryId);

            const divImgCard = document.createElement('div');
            divImgCard.setAttribute("class", "border-img");
            divImgCard.style.backgroundColor = await getColorCategory(categoryId);
            const img = document.createElement('img');
            img.setAttribute("src", urlImg);
           
            const nameTag = document.createElement('p');
            var title = currentValue.title;
            if (title.toLowerCase() === 'add your title') {
                const objCategory = await getCategory(categoryId);
                title = getCategoryNameById(objCategory, categoryId);

            }
            nameTag.innerHTML = title;

            if(currentValue.priority){
                divCard.style.position = 'relative';
                const importanceDiv = document.createElement('div');
                importanceDiv.setAttribute('class', 'importance');
                importanceDiv.style.position = 'absolute';
                divCard.appendChild(importanceDiv);

            }

            divImgCard.appendChild(img);
            divCat.appendChild(divImgCard);
            divCat.appendChild(nameTag);
            divInt.appendChild(divCat);

            const divBtn = document.createElement('div');
            divBtn.setAttribute("class", "container-button");

            const btn = document.createElement("button");
            btn.setAttribute("class", "add");
            btn.setAttribute("id", "addText");
            btn.setAttribute("onclick", "window.location.href='../../view/registrationChange.html'");

            const imgBtn = document.createElement("img");
            imgBtn.setAttribute("id", "imgBtn");
            imgBtn.setAttribute("src", "../../assets/images/plus_icon.svg");

            btn.appendChild(imgBtn);
            divBtn.appendChild(btn);
            divInt.appendChild(divBtn);
            divCard.appendChild(divInt);
            section.appendChild(divCard);

        }




    });
});