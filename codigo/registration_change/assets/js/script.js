
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
    var buttonDone = document.querySelector('#addBtn');
    buttonDone.addEventListener('click', function(){
        alert("Hello");
    },false);
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        console.log("Checked");
        var sectionStart = document.createElement("section");
        sectionStart.setAttribute("class", "container-date");
        var timeStart = document.createElement('input');
        var elementChild = document.querySelector('body > main > section.add-button');
        timeStart.setAttribute("type","time");
        timeStart.setAttribute("id","timeStart");
        timeStart.setAttribute("min","12:00");
        timeStart.setAttribute("max", "18:00");
        timeStart.setAttribute("required", "");
        sectionStart.appendChild(timeStart);
        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(sectionStart,elementChild);

      } else {
        // do that
        console.log("Not checked");
      }
    }); 
  });