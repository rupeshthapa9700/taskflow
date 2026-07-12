const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#add-task-input");
const taskContainer = document.querySelector("#task-container");
const taskCount = document.querySelector("#task-count");


taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value;

    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    taskContainer.appendChild(li);
    taskInput.value = "";

    updateTaskCount();
});


taskContainer.addEventListener("click", (event) => {

    if(event.target.classList.contains("edit-btn")){
        const li = event.target.parentElement;
        const taskText = li.querySelector("span");

        if(event.target.textContent === "Edit"){

    const input = document.createElement("input");
    input.type = "text";
    input.value = taskText.textContent;
    input.classList.add("edit-input");

    li.replaceChild(input, taskText);

    event.target.textContent = "Save";

} else {

    const input = li.querySelector(".edit-input");

    const span = document.createElement("span");
    span.textContent = input.value;

    li.replaceChild(span, input);

    event.target.textContent = "Edit";
}
    }

    if(event.target.classList.contains("delete-btn")){
        event.target.parentElement.remove();
        updateTaskCount();
    }


    if(event.target.type === "checkbox"){

        const taskText = event.target.parentElement.querySelector("span");

        taskText.classList.toggle("completed");

        updateTaskCount();
    }

});


function updateTaskCount(){

    const tasks = document.querySelectorAll("#task-container li");

    let count = 0;

    tasks.forEach(function(task){

        const checkbox = task.querySelector("input[type='checkbox']");

        if(!checkbox.checked){
            count++;
        }

    });

    taskCount.textContent = `${count} tasks remaining`;
}