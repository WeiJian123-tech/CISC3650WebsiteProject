//When website page has loaded...
window.onload=function() {
    //Gets input information from form and outputs a task.
    document.getElementById("inputForm").onsubmit=function(e) {
        e.preventDefault(); //Prevents default form Get and Post methods.

        const task = document.getElementById("task").value;
        const date = document.getElementById("date").value;

        const subTasks = document.querySelectorAll("input.subtasks");

        const subDates = document.querySelectorAll("input.subdates");

        /*

        console.log("Task: " + task + " | Date: " + date);

        for(const s of subTasks) {
            console.log(s.value);
        }

        for(const d of subDates) {
            console.log(d.value);
        }

        */

        addTask(task, date, subTasks, subDates);

    }
}

/*
Adds labels, an input to submit a subtask, and a date input to select a date.
*/
function addSubTaskInput() {
    //Container to hold each subtask submission form.
    const subTaskInputCont = document.getElementById("subTaskInputCont");

    //Container to hold a subtask submission form.
    const subTaskInputDiv = document.createElement("div");
    subTaskInputDiv.setAttribute('class', 'subtaskInputs');

    const subTaskInputLabel = document.createElement("label");
    subTaskInputLabel.setAttribute('for', 'subtask');

    const subTaskInputLabelTxt = document.createTextNode("Subtask: ");

    subTaskInputLabel.appendChild(subTaskInputLabelTxt);

    const subTaskInput = document.createElement("input");
    subTaskInput.setAttribute('type', 'text');
    subTaskInput.setAttribute('name', 'subtask');
    subTaskInput.setAttribute('class', 'subtasks');

    const subTaskDateLabel = document.createElement("label");
    subTaskDateLabel.setAttribute('for', 'date');

    const subTaskDateLabelTxt = document.createTextNode("Date: ");

    subTaskDateLabel.appendChild(subTaskDateLabelTxt);

    const subDateInput = document.createElement("input");
    subDateInput.setAttribute('type', 'date');
    subDateInput.setAttribute('name', 'date');
    subDateInput.setAttribute('class', 'subdates');

    subTaskInputDiv.appendChild(subTaskInputLabel);
    subTaskInputDiv.appendChild(subTaskInput);
    subTaskInputDiv.appendChild(subTaskDateLabel);
    subTaskInputDiv.appendChild(subDateInput);

    subTaskInputCont.appendChild(subTaskInputDiv);
}

/*
Removes the div that stores labels, an input to submit a subtask, and a date input to select a date.
*/
function removeSubTaskInput() {
    const subTaskInputDiv = document.querySelector(".subtaskInputs");

    subTaskInputDiv.remove();
}


/*
Gets html fieldset ids, generates unique ids for divs inside the fieldsets, and adds a task to the webpage.
*/
function addTask(task, date, subtasks, subdates) {

    //Appends rowDiv to parent fieldset element with id="fieldList".

    const uncompletedTasks = document.getElementById("uncompletedTasks");
    const completedTasks = document.getElementById("completedTasks");

    const randomID1 = Math.floor(Math.random() * Date.now());
    const randomID2 = Math.floor(Math.random() * Date.now());

    addTaskItem(uncompletedTasks, completedTasks, task, date, subtasks, subdates, randomID1, randomID2);

}

/*
Creates a task that can be checked on or off, a list item that displays the tasks and possibly a date, 
a button that changes the color of the tasks, a delete button to remove a task, and possible subtasks underneath.
*/
function addTaskItem(uncompletedTasks, completedTasks, task, date, subtasks, subdates, id1, id2) {

    //Container div that encapsulates a task and its subtasks.
    const taskItem = document.createElement("div");
    taskItem.setAttribute('id', id1);
    taskItem.setAttribute('class', 'list-group-item')

    //Container div to store a task
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute('class', 'row');
    taskDiv.setAttribute('id', id2);


    //Container div to store a task's subtasks
    const subtaskDiv = document.createElement("div");

    //Creates a nested list within the HTML parent list.
    const nestedList = document.createElement("ul");



    addCheckBox(uncompletedTasks, completedTasks, taskItem, taskDiv, nestedList, subtasks, subdates);
    addListItem(taskDiv, task, date);
    addColorPicker(taskItem, taskDiv);
    addDeleteButton(taskItem, taskDiv);



    subtaskDiv.appendChild(nestedList);

    taskItem.appendChild(taskDiv);
    taskItem.appendChild(subtaskDiv);

    uncompletedTasks.appendChild(taskItem);
    //completedTasks.appendChild(taskItem);

}

/*
Creates a checkbox for each task
*/
function addCheckBox(uncompletedTasks, completedTasks, grandparentDiv, parentDiv, nestedList, subtasks, subdates) {

    //Fist div element
    const checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent checkBoxDiv element
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "checkBox form-check-input me-1");

    //Appends HTML input element to its parent div tags
    checkBoxDiv.appendChild(checkBox);

    parentDiv.appendChild(checkBoxDiv);

    //console.log("subCheckBox: " + subCheckBox);

    const subtaskArr = [];
    const subdateArr = [];
    
    for(const s of subtasks) {
        subtaskArr.push(s.value);
    }

    console.log("subtask array: " + subtaskArr);

    for(const d of subdates) {
        subdateArr.push(d.value);
    }

    console.log("subtask date array: " + subdateArr);


    for(i = 0; i < subtaskArr.length; i++) {
        //Container div that stores subtask components
        const subtaskDiv = document.createElement("div");
        subtaskDiv.setAttribute('class', 'row');
        
        //div element that stores subtask checkboxes
        const checkBoxSubDiv = document.createElement("div");
        checkBoxSubDiv.setAttribute('class', 'col checkboxDiv');
        
        //Create HTML input element for parent checkBoxDiv element
        const subCheckBox = document.createElement("input");
        subCheckBox.setAttribute("type", "checkbox");
        subCheckBox.setAttribute("class", "subCheckBox form-check-input me-1");
        
        const subtask = subtaskArr[i];
        const subdate = subdateArr[i];

        //console.log("subtask: " + subtask + " subdate: " + subdate);

        appendSubtask(checkBoxSubDiv, subCheckBox, subtaskDiv, subtask, subdate, nestedList);

        //Completes and Un-completes tasks by putting uncompleted tasks into completed field and vise-versa.
        //Checks subtask checkboxes in addition to the main task checkbox
        checkBox.addEventListener("change", () => {
            if(checkBox.checked) {
                subCheckBox.checked = true;

                completedTasks.appendChild(grandparentDiv);
            } else {
                subCheckBox.checked = false;

                uncompletedTasks.appendChild(grandparentDiv);
            }
        });
    }

    //Checks only the main task checkbox without any subtask checkboxes.
    checkBox.addEventListener("change", () => {
        if(checkBox.checked) {
            grandparentDiv.style.boxShadow = "10px 10px 10px 10px lightgreen"; //Produce a glow for user feedback

            completedTasks.appendChild(grandparentDiv);
        } else {
            grandparentDiv.style.boxShadow = "0px 0px 0px 0px lightblue"; //Hide glow to indicate undo of completed task

            uncompletedTasks.appendChild(grandparentDiv);
        }
    });

    
}

function appendSubtask(checkBoxSubDiv, subCheckBox, subtaskDiv, subtask, subdate, nestedList) {
    

    checkBoxSubDiv.appendChild(subCheckBox);
    subtaskDiv.appendChild(checkBoxSubDiv);

    addListItem(subtaskDiv, subtask, subdate); //for loop repeats function but not const variables

    nestedList.appendChild(subtaskDiv);
}

/*
function addSubTaskItem(nestedList, subtask, subdate) {

    //Container div that stores subtask components
    const subtaskDiv = document.createElement("div");
    subtaskDiv.setAttribute('class', 'row');

    addSubCheckBox(subtaskDiv);
    addListItem(subtaskDiv, subtask, subdate);

    nestedList.appendChild(subtaskDiv);
    
}

function addSubCheckBox(parentDiv) {

    //Fist div element
    const checkBoxSubDiv = document.createElement("div");
    checkBoxSubDiv.setAttribute('class', 'col checkboxDiv');

    //Create HTML input element for parent checkBoxDiv element
    const subCheckBox = document.createElement("input");
    subCheckBox.setAttribute("type", "checkbox");
    subCheckBox.setAttribute("class", "subCheckBox");

    checkBoxSubDiv.appendChild(subCheckBox);

    parentDiv.appendChild(checkBoxSubDiv);
}
*/

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

/*
Creates an input of type="color" for the user to select a color for their task.
*/
function addColorPicker(grandparentDiv , parentDiv) {

    const colorInputDiv = document.createElement("div");
    colorInputDiv.setAttribute('class', 'col colorCodeDiv');

    const colorInput = document.createElement("input");
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('value', '#d900df');

    //console.log(parentDiv.id);

    const grandparentDivID = "[id='" + grandparentDiv.id + "']";

    colorInput.addEventListener("change", (event) => {
        const updateDiv = document.querySelector(grandparentDivID);

        if(updateDiv) {
            updateDiv.style.backgroundColor = event.target.value;
        }
    });

    colorInput.select();

    colorInputDiv.appendChild(colorInput);

    parentDiv.appendChild(colorInputDiv);
    
}

//Delete button should deleted tasks and subtasks
function addDeleteButton(grandparentDiv, parentDiv) {

    const deleteBtnDiv = document.createElement("div");
    deleteBtnDiv.setAttribute('class', 'col buttonDiv');

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('class', 'btn btn-danger');

    const deleteBtnText = document.createTextNode("Delete");

    deleteBtn.appendChild(deleteBtnText);

    const grandparentDivID = "[id='" + grandparentDiv.id + "']";
    //const parentDivID = "[id='" + parentDiv.id + "']";

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

