//When website page has loaded...
window.onload=function() {
    //Gets input information from form and outputs a task.
    document.getElementById("thisForm").onsubmit=function(e) {
        e.preventDefault(); //Prevents default form Get and Post methods.

        const task = document.getElementById("task").value;
        const date = document.getElementById("date").value;

        //console.log("Task: " + task + " | Date: " + date);

        addList(task, date);
    }
}

//Creates a new HTML list element to the HTML DOM
function addList(task, date) {

    //Create parent div with .row class to store child divs with .col class
    const createRowDiv = document.createElement("div");
    createRowDiv.setAttribute('class', 'row');

    //Create two child divs: one with .col and .checkboxDiv class, one with .col class.

    //Fist div element
    const createColBoxDiv = document.createElement("div");
    createColBoxDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent createColBoxDiv element
    const createInput = document.createElement("input");
    createInput.setAttribute("type", "checkbox");

    //Appends HTML input element to its parent div tags
    createColBoxDiv.appendChild(createInput);


    //Second div element
    const createColDiv = document.createElement("div");
    createColDiv.setAttribute('class', 'col');

    //Creates a new HTML list element
    const createListItem = document.createElement("li");

    const newListText = document.createTextNode(task + " " + date);

    createListItem.appendChild(newListText);

    //Appends List element to its parent div element.
    createColDiv.appendChild(createListItem);
    

    //Appends createColBoxDiv and createColDiv to parent div with .row class
    createRowDiv.appendChild(createColBoxDiv);
    createRowDiv.appendChild(createColDiv);

    //Appends createRowDiv to parent fieldset element with id="fieldList".
    const fieldList = document.getElementById("fieldList");
    fieldList.appendChild(createRowDiv);

}