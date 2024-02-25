//When website page has loaded...
window.onload=function() {
    //Gets input information from form and outputs a task.
    document.getElementById("thisForm").onsubmit=function(e) {
        e.preventDefault(); //Prevents default form Get and Post methods.

        const task = document.getElementById("task").value;
        const date = document.getElementById("date").value;

        //console.log("Task: " + task + " | Date: " + date);

        addTask(task, date);
    }
}

/*
Creates a tasks that can be checked on or off, a list item that displays the tasks and possibly a date,
a button to create subtask(s) underneath, a button that changes the color of the tasks, and 
a delete button to remove a task.
*/

function addTask(task, date) {

    //Appends rowDiv to parent fieldset element with id="fieldList".

    const uncompletedTasks = document.getElementById("uncompletedTasks");
    const completedTasks = document.getElementById("completedTasks");

    addTaskItem(uncompletedTasks, completedTasks, task, date);

}

/*
Creates the task item the the user requests.
*/
function addTaskItem(uncompletedTasks, completedTasks, task, date) {
    //Create parent div with .row class to store child divs with .col class
    const rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', 'row');

    addCheckBox(uncompletedTasks, completedTasks, rowDiv);
    addListItem(rowDiv, task, date);
    addButton(rowDiv, task, date, "Subtask", addSubtaskItem(task,date));

    //Create parent div to store all subtask items
    const rowSubDiv = document.createElement("div");
    rowSubDiv.setAttribute('class', 'row align-items-center d-flex');

    //Create a nested list within the parent list.
    const createList = document.createElement("ul");

    //For addSubtaskItem()
    const listDiv = document.createElement("div");
    listDiv.setAttribute('class', "col");

    const subList = document.createElement("li");
    const subListTxt = document.createTextNode("Potato");

    subList.appendChild(subListTxt);

    createList.appendChild(subList);

    listDiv.appendChild(createList);

    rowSubDiv.appendChild(listDiv);

    uncompletedTasks.appendChild(rowDiv);
    uncompletedTasks.appendChild(rowSubDiv);
}

/*
Creates a subtask item after the user has entered in information about their subtask
and pressed the button to create a subtask.

When the subtask button is clicked, unhide the div underneath addTaskItem div with ul. 
Create a nested .row div within the unhidden div.
*/
function addSubtaskItem(task, date) {

    
}

/*
Creates a checkbox for each task
*/
function addCheckBox(uncompletedTasks, completedTasks, rowDiv) {

    //Fist div element
    const checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent checkBoxDiv element
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    //Completes and Un-completes tasks by putting uncompleted tasks into completed field and vise-versa.
    checkBox.addEventListener("change", () => {
        if(checkBox.checked) {
            completedTasks.appendChild(rowDiv);
        } else {
            uncompletedTasks.appendChild(rowDiv);
        }
    });

    //Appends HTML input element to its parent div tags
    checkBoxDiv.appendChild(checkBox);

    rowDiv.appendChild(checkBoxDiv);
}

/*Creates a list item */document.getElementById("uncompletedTasks")
function addListItem(rowDiv, task, date) {
    //Second div element
    const listItemDiv = document.createElement("div");
    listItemDiv.setAttribute('class', 'col');

    //Creates a new HTML list element
    const createListItem = document.createElement("li");

    const newListText = document.createTextNode(task + " " + date);

    createListItem.appendChild(newListText);

    //Appends List element to its parent div element.
    listItemDiv.appendChild(createListItem);

    rowDiv.appendChild(listItemDiv);
}

function addButton(rowDiv, task, date, buttonText, event) {

    const btnDiv = document.createElement("div");
    btnDiv.setAttribute('class', 'col');

    const createBtn = document.createElement("button");
    createBtn.setAttribute('type', 'button');
    //createBtn.setAttribute('onclick', '');

    const newBtnText = document.createTextNode(buttonText)

    createBtn.appendChild(newBtnText);

    createBtn.addEventListener("click", () => {
        if(createBtn.click) {
            this.event;
            //addSubtaskItem(task, date);
            console.log("Clicked");
        } else {
            console.log("Not Clicked");
        }
    });

    btnDiv.appendChild(createBtn);

    rowDiv.appendChild(btnDiv);
}

/*
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

    //Create a function for repetitive code.
    

    //Appends createColBoxDiv and createColDiv to parent div with .row class
    createRowDiv.appendChild(createColBoxDiv);
    createRowDiv.appendChild(createColDiv);

    //Appends createRowDiv to parent fieldset element with id="fieldList".
    const uncompletedList = document.getElementById("uncompletedList");
    uncompletedList.appendChild(createRowDiv);

    const completedList = document.getElementById("completedList");

    //Completes and Un-completes tasks by putting uncompleted tasks into completed field and vise-versa.
    createInput.addEventListener("change", () => {
        if(createInput.checked) {
            completedList.appendChild(createRowDiv);
            
        } else {
            uncompletedList.appendChild(createRowDiv);
        }
    });

}
*/