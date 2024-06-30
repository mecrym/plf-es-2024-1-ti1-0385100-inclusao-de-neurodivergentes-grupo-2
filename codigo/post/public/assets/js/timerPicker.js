
import { StorageService } from '../../services/localStorage-service.js';

export function getSelectsFromSelection(timePicker) {
    if (!timePicker) {

        throw new Error('The timePicker element is null.');
    }
    const [hour, minute] = timePicker.querySelectorAll(".time-picker__select");
    return {
        hour,
        minute,
    };
}
function addOptions(number, selectedValue) {
    const padded = number.toString().padStart(2, "0"); /* if is a signle number like 5, add 0 on the left side ex: 05*/
    const isSelected = number === selectedValue ? ' selected' : '';/* number in array is equal to value on local storage? if is true is selected but if isnot is '' */
    return `<option value="${padded}"${isSelected}>${padded}</option>`;
}
export function buildTimePicker(initialTime) {
    var divInput = document.createElement("div");

    const hour = initialTime.hasOwnProperty('hour') ? initialTime.hour : 0;
    const minute = initialTime.hasOwnProperty('minute') ? initialTime.minute : 0;
    console.log('initialTime.hour',initialTime.hour);
    console.log('initialTime.minute',initialTime.minute);

    const hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(hour => addOptions(hour, initialTime.hour));
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(minute => addOptions(minute, initialTime.minute));

    divInput.classList.add("time-picker");
    divInput.innerHTML = `
    <select class="time-picker__select">
        ${hourOptions.join("")}
    </select>
    :
    <select class="time-picker__select">
        ${minuteOptions.join("")}
    
    
    `;
    return divInput;
}
export function selectHandle(timePicker, type, data) {

    const selects = getSelectsFromSelection(timePicker);
    var dataMod = {};
    selects.hour.addEventListener('change', () => {
        console.log('data in timer picker: ', data);
        data.hour = Number(selects.hour.value);
        dataMod ={
            hour: data.hour,
            type:type
        }
        console.log('dataMod', dataMod);
        StorageService.saveData(`${type}-hour`, data.hour);

    });

    selects.minute.addEventListener('change', () => {
        data.minute = Number(selects.minute.value);
        dataMod ={
            minute: data.hour,
            type:type
        }
        StorageService.saveData(`${type}-minute`, data.minute);
    
    });




}


