const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#add-task-input");
const taskContainer = document.querySelector("#task-container");
const taskCount = document.querySelector("#task-count");
const filterButtons = document.querySelectorAll("#filter-buttons button");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = {
    id: Date.now(),
    text: taskInput.value,
    completed: false
  }
  tasks.push(task);
  saveTasks();



  taskInput.value = "";
  renderTasks();
  updateTaskCount();
});

taskContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const li = event.target.parentElement;
    const taskText = li.querySelector("span");

    if (event.target.textContent === "Edit") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskText.textContent;
      input.classList.add("edit-input");

      li.replaceChild(input, taskText);

      event.target.textContent = "Save";
    } else {

    const input = li.querySelector(".edit-input");

    const id = Number(li.dataset.id);

    tasks = tasks.map(function(task){

        if(task.id === id){
            task.text = input.value;
        }

        return task;

    });

    saveTasks();

    renderTasks();

}
  }

  if (event.target.classList.contains("delete-btn")) {
    const li = event.target.parentElement;
     const id = Number(li.dataset.id);
     tasks = tasks.filter(function(task){
        return task.id !== id;
    });

    saveTasks();

    renderTasks();
    updateTaskCount();
  }

  if (event.target.type === "checkbox") {

    const li = event.target.parentElement;

    const id = Number(li.dataset.id);

    tasks = tasks.map(function(task){

        if(task.id === id){
            task.completed = event.target.checked;
        }

        return task;

    });

    saveTasks();

    renderTasks();

    updateTaskCount();
}
});

function updateTaskCount() {
  const tasks = document.querySelectorAll("#task-container li");

  let count = 0;

  tasks.forEach(function (task) {
    const checkbox = task.querySelector("input[type='checkbox']");

    if (!checkbox.checked) {
      count++;
    }
  });

  taskCount.textContent = `${count} tasks remaining`;
}

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const filter = button.dataset.filter;

        const tasks = document.querySelectorAll("#task-container li");


        tasks.forEach(function(task){

            const checkbox = task.querySelector("input[type='checkbox']");


            if(filter === "all"){
                task.style.display = "flex";
            }

            else if(filter === "active"){

                if(!checkbox.checked){
                    task.style.display = "flex";
                }
                else{
                    task.style.display = "none";
                }

            }

            else if(filter === "completed"){

                if(checkbox.checked){
                    task.style.display = "flex";
                }
                else{
                    task.style.display = "none";
                }

            }

        });

    });

});
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}
function renderTasks(){

    taskContainer.innerHTML = "";

    tasks.forEach(function(task){

        const li = document.createElement("li");
        li.dataset.id = task.id;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        taskContainer.appendChild(li);

    });

}
renderTasks();
updateTaskCount();