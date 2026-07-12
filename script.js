const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#add-task-input");
const taskContainer = document.querySelector("#task-container");

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
    taskContainer.append(li);
    taskInput.value = "";
});

taskContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-btn")){
        event.target.parentElement.remove();
    }

    if(event.target.type === "checkbox"){
    const taskText = event.target.nextElementSibling;

    taskText.classList.toggle("completed");
}
});