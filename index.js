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

    const randomID1 = Math.floor(Math.random() * Date.now());
    const randomID2 = Math.floor(Math.random() * Date.now());

    addTaskItem(uncompletedTasks, completedTasks, task, date, randomID1, randomID2);

}

/*
Creates the task item the the user requests.
*/
function addTaskItem(uncompletedTasks, completedTasks, task, date, id1, id2) {

    //Parent div that encapsulates the main task and the subtask.
    const taskItem = document.createElement("div");
    taskItem.setAttribute('id', id1);

    //Create main task parent div with .row class to store child divs with .col class
    const rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', 'row');
    rowDiv.setAttribute('id', id2);

    addCheckBox(uncompletedTasks, completedTasks, rowDiv);
    addListItem(rowDiv, task, date);
    

    //Create parent div to store all subtask items
    const rowSubDiv = document.createElement("div");

    //Create a nested list within the parent list.
    const nestedList = document.createElement("ul");

    //Creates a div and a nested ul.
    rowSubDiv.appendChild(nestedList);

    //addSubTaskButton(rowDiv, nestedList, task, date);
    addColorPicker(rowDiv);
    addDeleteButton(taskItem, rowDiv);

    taskItem.appendChild(rowDiv);
    taskItem.appendChild(rowSubDiv);

    uncompletedTasks.appendChild(taskItem);
}

/*
Need to revise program for subtasks. 
Cannot have child forms within forms.
*/

/*
function addSubTaskButton(parentDiv, list, task, date) {

    const subTaskBtnDiv = document.createElement("div");
    subTaskBtnDiv.setAttribute('class', 'col addSubDiv');

    const subTaskBtn = document.createElement("button");
    subTaskBtn.setAttribute('type', 'button'); //submit
    //createBtn.setAttribute('onclick', '');

    const subBtnText = document.createTextNode("Subtask");

    subTaskBtn.appendChild(subBtnText);


    const taskInputDiv = document.createElement("div");
    taskInputDiv.setAttribute('class', 'col');

    const subTaskLabel = document.createElement("label");
    subTaskLabel.setAttribute('for', 'subTask');

    const subTaskInput = document.createElement("input");
    subTaskInput.setAttribute('type', 'text');
    subTaskInput.setAttribute('name', 'subTask');
    subTaskInput.setAttribute('id', 'subTask');

    const subDateLabel = document.createElement("label");
    subDateLabel.setAttribute('for', 'subDate');

    const subDateInput = document.createElement("input");
    subDateInput.setAttribute('type', 'date');
    subDateInput.setAttribute('name', 'subDate');
    subDateInput.setAttribute('id', 'subDate');

    const subSubmitBtn = document.createElement("button");
    subSubmitBtn.setAttribute('type', 'submit');

    const subSubmitBtnTxt = document.createTextNode("Submit");
    subSubmitBtn.appendChild(subSubmitBtnTxt);

    
    taskInputDiv.appendChild(subTaskLabel);
    taskInputDiv.appendChild(subTaskInput);
    taskInputDiv.appendChild(subDateLabel);
    taskInputDiv.appendChild(subDateInput);
    taskInputDiv.appendChild(subSubmitBtn);


    subTaskBtn.addEventListener("click", () => {
        if(subTaskBtn.click) {

        }
    });

    subTaskBtnDiv.appendChild(subTaskBtn);

    parentDiv.appendChild(subTaskBtnDiv);
    parentDiv.appendChild(taskInputDiv);
}
*/

/*
Creates an input of type="color" for the user to select a color for their task.
*/
function addColorPicker(parentDiv) {

    const colorInputDiv = document.createElement("div");
    colorInputDiv.setAttribute('class', 'col colorCodeDiv');

    const colorInput = document.createElement("input");
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('value', '#d900df');

    //console.log(parentDiv.id);

    const parentDivID = "[id='" + parentDiv.id + "']";

    colorInput.addEventListener("change", (event) => {
        const updateDiv = document.querySelector(parentDivID);

        if(updateDiv) {
            updateDiv.style.backgroundColor = event.target.value;
        }
    });

    colorInput.select();

    colorInputDiv.appendChild(colorInput);

    parentDiv.appendChild(colorInputDiv);
    
}

function addDeleteButton(grandparentDiv, parentDiv) {

    const deleteBtnDiv = document.createElement("div");
    deleteBtnDiv.setAttribute('class', 'col buttonDiv');

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('type', 'button');

    const deleteBtnText = document.createTextNode("Delete");

    deleteBtn.appendChild(deleteBtnText);

    const grandparentDivID = "[id='" + grandparentDiv.id + "']";

    deleteBtn.addEventListener("click", () => {
        if(deleteBtn.click) {
            const deleteDiv = document.querySelector(grandparentDivID);
            deleteDiv.remove();
        } else {
            console.log("Not Clicked");
        }
    });


    deleteBtnDiv.appendChild(deleteBtn);

    parentDiv.appendChild(deleteBtnDiv);

}

/*
Creates a subtask item after the user has entered in information about their subtask
and pressed the button to create a subtask.

When the subtask button is clicked, creates divs with checkbox and list item.
*/
/*
function addSubtaskItem(nestedList, task, date) {

    const subListDiv = document.createElement("div");
    subListDiv.setAttribute('class', 'd-flex row align-items-center');

    addSubCheckBox(subListDiv);
    addListItem(subListDiv, task, date); //Make new input for user subtask and date.

    nestedList.appendChild(subListDiv);

}
*/

//Cannot delete tasks when completed due to the delete button referencing different ids
function addSubCheckBox(parentDiv) {
    //Fist div element
    const checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent checkBoxDiv element
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    //Appends HTML input element to its parent div tags
    checkBoxDiv.appendChild(checkBox);

    parentDiv.appendChild(checkBoxDiv);
}

/*
Creates a checkbox for each task
*/
function addCheckBox(uncompletedTasks, completedTasks, parentDiv) {

    //Fist div element
    const checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent checkBoxDiv element
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    //Completes and Un-completes tasks by putting uncompleted tasks into completed field and vise-versa.
    checkBox.addEventListener("change", () => {
        if(checkBox.checked) {
            completedTasks.appendChild(parentDiv);
        } else {
            uncompletedTasks.appendChild(parentDiv);
        }
    });

    //Appends HTML input element to its parent div tags
    checkBoxDiv.appendChild(checkBox);

    parentDiv.appendChild(checkBoxDiv);
}

/*Creates a list item */
function addListItem(parentDiv, task, date) {
    //Second div element
    const listItemDiv = document.createElement("div");
    listItemDiv.setAttribute('class', 'col');

    //Creates a new HTML list element
    const createListItem = document.createElement("li");

    const newListText = document.createTextNode(task + " " + date);

    createListItem.appendChild(newListText);

    //Appends List element to its parent div element.
    listItemDiv.appendChild(createListItem);

    parentDiv.appendChild(listItemDiv);
}