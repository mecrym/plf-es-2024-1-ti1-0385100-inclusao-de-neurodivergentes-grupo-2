
import * as TimePicker from './TimePicker.js';

document.addEventListener('DOMContentLoaded', function () {
    
    const checkbox = document.querySelector('#switch');
    const checkboxDone = document.querySelector('#switchBtn2');
    const buttonDone = document.querySelector('#addBtn');
    const addBtn2 = document.querySelector('#addText');
    const divBtn = addBtn2.parentNode;
    const containerTextDiv = document.querySelector('.container-text');
    const childDivAdd = addBtn2.childNodes;
    const divsContainer = containerTextDiv.childNodes;
    const divP = document.querySelector('.container-p');
    const containerTextSelect = document.querySelector('.container-select-completion');
    const containerSelect = document.querySelector('.container-select');
    const completedTask = document.querySelector('.completed-task');
    var textP = divP.childNodes;
    var onClick = true;

   

    addBtn2.addEventListener('click', (event)=>{
      if(onClick){
        onClick = false;
        console.log("on click");
        containerTextDiv.style.height = '100%';
        childDivAdd[1].src = "/assets/images/minus.svg";
        textP[1].textContent = "Add your title";
        textP[1].style.color = '#FFC700';
        containerTextSelect.style.visibility = "hidden";
        containerSelect.style.visibility = "hidden";
        completedTask.style.visibility = "hidden";
        buttonDone.style.visibility = "hidden";
        var textArea =document.createElement("textarea");
        var elementChild = document.querySelector('body > main > section.container-text');
        textArea.setAttribute("rows","10");
        textArea.setAttribute("cols", "25");
        textArea.setAttribute("class","text");
        textArea.textContent = "Add your text";
        containerTextDiv.appendChild(textArea);
        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(containerTextDiv,elementChild);
       
        
      }
      else{
        onClick = true;
        console.log("is not clicked");
        childDivAdd[1].src = "/assets/images/plus_icon.svg";
        containerTextDiv.style.height = '150px';
        textP[1].style.color = '#FFFF';
        containerTextSelect.style.visibility = "visible";
        containerSelect.style.visibility = "visible";
        completedTask.style.visibility = "visible";
        buttonDone.style.visibility = "visible";
        var textArea = containerTextDiv.querySelector(".text");
        if (textArea) {
            textArea.remove();
        }
      }
     
      
      
    }, false);
    
    buttonDone.addEventListener('click', ()=>{
        alert("Done");
    },false);

    checkboxDone.addEventListener('change', ()=> {
      if(checkboxDone.checked){
        console.log("checked 2° btn");
      }
    });
  
    checkbox.addEventListener('change', ()=> {
      const sectionDone = document.querySelector('.completed-task');
      if (checkbox.checked) {
        sectionDone.style.visibility = "hidden";
        console.log("Checked");
        var section = document.createElement("section");
        section.setAttribute("class", "container-date");
        var text = document.createElement('p');
        text.textContent = "End Time:";
        text.style.marginTop = '-100px'; 
        section.appendChild(text);
        let elementChild = document.querySelector('body > main > section.add-button');
        var divTimePicker = TimePicker.buildTimePicker();
        section.appendChild(divTimePicker);
      
        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(section,elementChild);
        

        var sectionStart = document.createElement("section");
        sectionStart.setAttribute("class", "container-date");
        var text = document.createElement("p");
        text.textContent= "Start Time:";
        text.style.marginTop = '-200px';
        sectionStart.appendChild(text);
        elementChild = document.querySelector('body > main > section.container-date');
        divTimePicker = TimePicker.buildTimePicker();
        divTimePicker.style.marginTop = '-100px';
        sectionStart.appendChild(divTimePicker);
        elementParent = elementChild.parentNode;
        elementParent.insertBefore(sectionStart,elementChild); 
        const timePicker = document.querySelectorAll(".time-picker");
        var timePickerStart = timePicker[0];
        var timePickerEnd = timePicker[1];
        
        
 
        try {
          TimePicker.selectHandle(timePickerStart,"start");
          TimePicker.selectHandle(timePickerEnd, "end");
        } catch(error) {
            console.error(error.message);
        }
      
      } else {
        const sections = document.querySelectorAll('.container-date');
        
        if(sections){
          sections.forEach(section => {
            section.remove(); 
          });
        }
        sectionDone.style.visibility = "visible";
        console.log("Not checked");
      }
    }); 
  });