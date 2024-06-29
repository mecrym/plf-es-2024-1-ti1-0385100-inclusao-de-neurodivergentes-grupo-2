import * as TimePicker from './timerPicker.js';
import * as CreateElements from './createElements.js';
//import * as Server from './serverHandle.js';

document.addEventListener('DOMContentLoaded', function () {
    
    const buttonDone = document.querySelector('#addBtn');
    const addBtn2 = document.querySelector('#addText');
    const containerTextDiv = document.querySelector('.container-text');
    const divP = document.querySelector('.container-p');
    var textP = divP.childNodes;
    var onClick = true;
    var selectCompletionCreated = false;
    var data ;//= LocalStorage.dataLoad("data");
    dataHandle(data);
    console.log(data);
    titleHandle(data);
   // console.log(`pego do locla storage ${JSON.stringgit aify(LocalStorage.dataLoad("data"))}`);
    /* var db = []
        readContato(dados => {
            db = dados;
            ListaTask()
        });*/
    function dataHandle(data){
        
      
        if(data==null){
            data = {
                category: "Sports",
                completion: false,
                startTime: {
                    hour: 0,
                    minute: 0,
                    meridiem: "am"
                },
                endTime: {
                    hour: 0,
                    minute: 0,
                    meridiem: "pm"
                },
                message:"Add your text",
                title:"Add your title"
            }
          //  LocalStorage.dataSave("data",data);
        }
        else{
            const checkboxDone = document.querySelector('#switchBtn2');
            const checkbox = document.querySelector('#switch');
            const sectionDone = document.querySelector('.completed-task');
            if(data.message==""){
                data.message = "Add your text";
              //  LocalStorage.dataSave("data",data);
            }
            if(data.title==""){
                data.title = "Add your title";
             //   LocalStorage.dataSave("data",data);
            }
            if(checkbox){
                if(data.completion == true){
                    checkboxDone.checked = true; 
                    checkboxDone.classList.add('greenFlag');
                    checkbox.classList.remove('greenFlag'); 
                    removeTimePickerSections();
                    sectionDone.style.visibility = "visible";
                    checkbox.setAttribute("disabled", true);
        
                }else{
                    checkbox.checked = true; 
                    checkboxDone.classList.remove('greenFlag');
                    checkbox.classList.add('greenFlag'); 
                    createOrUpdateTimePickerSections();
                    sectionDone.style.visibility = "hidden";
                }
            }
           
        }
        
        

    }
    function titleHandle(data){
        const titleArea = document.querySelector('#textTitle');
        titleArea.textContent = data.title;

    }
    function attachEventListeners() {
        const checkboxDone = document.querySelector('#switchBtn2');
        const checkbox = document.querySelector('#switch');
        const titleArea = document.querySelector('#textTitle');
        const textArea = document.querySelector('.text');
        data = LocalStorage.dataLoad("data");
        dataHandle(data);

        if(textArea){
            textArea.addEventListener('input', function() {
                data.message =  textArea.value;
                LocalStorage.dataSave("data", data);

            });
        }
        if(titleArea){
            titleArea.addEventListener('input', function() {
                data.title =  titleArea.value;
            //    console.log(`O valor de data eh ${JSON.stringify(data)}`);
                LocalStorage.dataSave("data", data);
    
            });
        }
        
        if (checkboxDone) {
            checkboxDone.addEventListener('change', () => {
                let check;
                if (checkboxDone.checked) {
                    console.log("checked 2° btn");
                    checkbox.setAttribute("disabled", true);
                    check = true;
                    data.completion = check;
                    LocalStorage.dataSave("data",data);
                    console.log(`the value of checked is ${data.completion}`);
                   
                } else {
                    checkbox.removeAttribute('disabled');
                    check = false;
                    data.completion = check;
                    console.log(`the value of checked is ${data.completion}`);
                    LocalStorage.dataSave("data",data);
                }
            });
        }

        if (checkbox) {
            checkbox.addEventListener('change', () => {
                const sectionDone = document.querySelector('.completed-task');
                if (checkbox.checked) {
                    sectionDone.style.visibility = "hidden";
                    console.log("Checked");
                    createOrUpdateTimePickerSections();
                } else {
                    removeTimePickerSections();
                    sectionDone.style.visibility = "visible";
                    console.log("Not checked");    
                }
            });
        }
    }

    addBtn2.addEventListener('click', (event) => {

        if (onClick) {
            onClick = false;
            console.log("on click");
            containerTextDiv.style.height = '100%';
            addBtn2.src = "../assets/images/minus.svg";
            textP[1].textContent = data.title;
            textP[1].style.color = '#FFC700';
            removeExistingSections();
            var textArea = document.createElement("textarea");
            var elementChild = document.querySelector('body > main > section.add-button');
            textArea.setAttribute("rows", "10");
            textArea.setAttribute("cols", "25");
            textArea.setAttribute("class", "text");
             
            textArea.textContent = data.message;
            containerTextDiv.appendChild(textArea);
            var elementParent = elementChild.parentNode;
            elementParent.insertBefore(containerTextDiv, elementChild);
            attachEventListeners();     
        } else {
            onClick = true;
            console.log("is not clicked");
            addBtn2.src = "/assets/images/plus_icon.svg";
            containerTextDiv.style.height = '150px';
            textP[1].style.color = '#FFFF';
            var textArea = containerTextDiv.querySelector(".text");
            if (textArea) {
                textArea.remove();
            }

            if (!selectCompletionCreated) {
                /* Create title select the completion */
                var section = CreateElements.createSection("container-select-completion");
                var title = CreateElements.createTitle("Select the completion");
                section.appendChild(title);
                var elementChild = document.querySelector('body > main > section.add-button');
                var elementParent = elementChild.parentNode;
                elementParent.insertBefore(section, elementChild);
                selectCompletionCreated = true;

                /* Create section "the task has a defined time" */
                var div = CreateElements.createDiv("container-p");
                var paragraph = CreateElements.createParagraph("The task has a defined time?");
                div.appendChild(paragraph);
                var divBtn = CreateElements.createDiv("switch");
                divBtn.setAttribute("id", "switchButton");
                var input = CreateElements.createInput("checkbox", "switch");
                divBtn.appendChild(input);
                var label = CreateElements.createLabel("switch", "Toggle");
                divBtn.appendChild(label);
                section = CreateElements.createSection("container-select");
                section.appendChild(div);
                section.appendChild(divBtn);
                elementChild = document.querySelector('body > main > section.add-button');
                elementParent.insertBefore(section, elementChild);

                /* Create section "Was the task completed?" */
                var div = CreateElements.createDiv("container-paragraph");
                var paragraph = CreateElements.createParagraph("Was the task completed?");
                div.appendChild(paragraph);
                var divBtn = CreateElements.createDiv("switch2");
                divBtn.setAttribute("id", "switchButton2");
                var input = CreateElements.createInput("checkbox", "switchBtn2");
                divBtn.appendChild(input);
                var label = CreateElements.createLabel("switchBtn2", "Toggle");
                divBtn.appendChild(label);
                section = CreateElements.createSection("completed-task");
                section.appendChild(div);
                section.appendChild(divBtn);
                elementChild = document.querySelector('body > main > section.add-button');
                elementParent.insertBefore(section, elementChild);

                attachEventListeners(); 
            }
             
        }
    }, false);

    buttonDone.addEventListener('click', () => {
        alert("Done");
    }, false);

    function removeExistingSections() {
        const sections = document.querySelectorAll('.container-select-completion, .container-select, .completed-task, .removeExistingSections, .container-date ');
        sections.forEach(section => {
            section.remove();
        });
        selectCompletionCreated = false;
    }

    function createOrUpdateTimePickerSections() {
        removeTimePickerSections();
        var section = document.createElement("section");
        section.setAttribute("class", "container-date");
        var text = document.createElement('p');
        text.textContent = "End Time:";
        text.style.marginTop = '-100px';
        section.appendChild(text);
        let elementChild = document.querySelector('body > main > section.add-button');
        var divTimePicker = TimePicker.buildTimePicker(data.endTime);
        section.appendChild(divTimePicker);

        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(section, elementChild);

        var sectionStart = document.createElement("section");
        sectionStart.setAttribute("class", "container-date");
        var textStart = document.createElement("p");
        textStart.textContent = "Start Time:";
        textStart.style.marginTop = '-200px';
        sectionStart.appendChild(textStart);
        elementChild = document.querySelector('body > main > section.container-date');
        divTimePicker = TimePicker.buildTimePicker(data.startTime);
        divTimePicker.style.marginTop = '-100px';
        sectionStart.appendChild(divTimePicker);
        elementParent = elementChild.parentNode;
        elementParent.insertBefore(sectionStart, elementChild);

        const timePickers = document.querySelectorAll(".time-picker");
        var timePickerStart = timePickers[0];
        var timePickerEnd = timePickers[1];

        try {
            TimePicker.selectHandle(timePickerStart, "startTime",data);
            TimePicker.selectHandle(timePickerEnd, "endTime",data);
        } catch (error) {
            console.error(error.message);
        }
    }

    function removeTimePickerSections() {
        const sections = document.querySelectorAll('.container-date');
        sections.forEach(section => {
            section.remove();
        });
    }

    attachEventListeners(); 

});
