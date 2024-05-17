

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
function addOptions(number){
    const padded = number.toString().padStart(2,"0"); /* if is a signle number like 5, add 0 on the left side ex: 05*/ 

    return `<option value="${padded}">${padded}</option>`;
}
export function buildTimePicker(){
    var divInput = document.createElement("div");
    const hourOptions = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(addOptions); /*passing 12 elements inside numberOptions*/ 
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(addOptions);
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
        <option value="am">AM</option>
        <option value="pm">PM</option>
    </select>
    
    `;
    return divInput;
}
export function selectHandle(timePicker, type){
    const selects = getSelectsFromSelection(timePicker);
    console.log(selects);
    var data = {type: type,
        hour:"00", 
        minute:"00", 
        meridiem:"am"
        };
     /*Default values*/ 
  
    selects.hour.addEventListener('change', () => {
        console.log('Selected time:', selects.hour.value);
        data.hour = selects.hour.value;
        console.log(data);
    });

    selects.minute.addEventListener('change', () => {
        console.log('Selected minute:', selects.minute.value);
        data.minute = selects.minute.value;
        console.log(data);
    });

    selects.meridiem.addEventListener('change', () => {
        console.log('Selected period:', selects.meridiem.value);
        data.meridiem = selects.meridiem.value;
        console.log(data);
    });
    console.log(data);
    
    return data;

}


