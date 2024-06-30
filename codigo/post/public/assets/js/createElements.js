

export function createTitle(title){
    var title = document.createElement("h1");
    title.textContent = "Select the completion";
    return title;
}
export function createSection(classSect){
    var section = document.createElement("section");
    section.setAttribute("class", classSect); 
    return section;
}
export function createDiv(classDiv){
    var div = document.createElement("div");
    div.setAttribute("class",classDiv);
    return div;
}
export function createParagraph(text){
    var paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
}
export function createInput(type,id){
    var input = document.createElement("input");
    input.setAttribute("type",type);
    input.setAttribute("id",id);
    return input;
}
export function createLabel(value, textContent){
    var label = document.createElement("label");
    label.setAttribute("for",value);
    label.textContent = textContent;
    return label;
}