import * as Server from './serverHandle.js';
import * as LocalStorage from './LocalStorage.js';


 export function getSelectsFromSelection(timePicker){
    if (!timePicker) {
        
        throw new Error('The timePicker element is null.');
    }
    const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");
    return{
        hour,
        minute,
        meridiem
    };
}
function addOptions(number,selectedValue){
    const padded = number.toString().padStart(2,"0"); /* if is a signle number like 5, add 0 on the left side ex: 05*/ 
    const isSelected = number === selectedValue ? ' selected' : '';/* number in array is equal to value on local storage? if is true is selected but if isnot is '' */
    return `<option value="${padded}"${isSelected}>${padded}</option>`;
}
export function buildTimePicker(initialTime){
    var divInput = document.createElement("div");
    const hourOptions = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hour =>addOptions(hour, initialTime.hour)); /*passing 12 elements inside numberOptions*/ 
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(minute => addOptions(minute, initialTime.minute));
    divInput.classList.add("time-picker");
    divInput.innerHTML=`
    <select class="time-picker__select">
        ${hourOptions.join("")}
    </select>
    :
    <select class="time-picker__select">
        ${minuteOptions.join("")}
    </select>
    <select class="time-picker__select" id="am-pm">
    <option value="am"${initialTime.meridiem === 'am' ? ' selected' : ''}>AM</option>
    <option value="pm"${initialTime.meridiem === 'pm' ? ' selected' : ''}>PM</option>
    </select>
    
    `;
    return divInput;
}
export function selectHandle(timePicker, type,data){
    const selects = getSelectsFromSelection(timePicker);
    selects.hour.addEventListener('change', () => {
        data[type].hour = Number(selects.hour.value);
        LocalStorage.dataSave("data",data);
      //  Server.saveToServer(data);

    });

    selects.minute.addEventListener('change', () => {
        data[type].minute = Number(selects.minute.value);
        LocalStorage.dataSave("data",data);
      //  Server.saveToServer(data);
    });

    selects.meridiem.addEventListener('change', () => {
        data[type].meridiem = selects.meridiem.value;
        LocalStorage.dataSave("data",data);
     //   Server.saveToServer(data);

    });
    

}


