
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#add-task-input");
const taskContainer = document.querySelector("#task-container");

const taskCount = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");

const filterButtons = document.querySelectorAll("#filter-buttons button");
const clearCompletedBtn = document.querySelector("#clear-completed");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";



/*
    Save Tasks
*/

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}




/*
    Add Task
*/

taskForm.addEventListener("submit", function(event){

    event.preventDefault();


    const text = taskInput.value.trim();


    if(text === ""){

        alert("⚠ Please add a task");

        return;

    }


    tasks.push({

        id: Date.now(),

        text:text,

        completed:false

    });


    saveTasks();


    taskInput.value = "";


    renderTasks();

});





/*
    Render Tasks
*/

function renderTasks(){


    taskContainer.innerHTML = "";


    const filteredTasks = tasks.filter(function(task){


        if(currentFilter === "active"){

            return !task.completed;

        }


        if(currentFilter === "completed"){

            return task.completed;

        }


        return true;


    });



    if(filteredTasks.length === 0){

        emptyMessage.style.display = "block";

    }
    else{

        emptyMessage.style.display = "none";

    }




    filteredTasks.forEach(function(task){


        const li = document.createElement("li");


        li.dataset.id = task.id;



        li.innerHTML = `

            <input 
            type="checkbox"
            ${task.completed ? "checked" : ""}
            >


            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>


            <button class="edit-btn">
                Edit
            </button>


            <button class="delete-btn">
                Delete
            </button>

        `;



        taskContainer.appendChild(li);


    });



    updateTaskCount();

}







/*
    Update Task Count
*/

function updateTaskCount(){


    const remaining = tasks.filter(function(task){

        return !task.completed;

    }).length;



    taskCount.textContent =
    `${remaining} tasks remaining`;

}








/*
    Task Actions
*/

taskContainer.addEventListener(
"click",
function(event){



    const li = event.target.closest("li");


    if(!li){

        return;

    }



    const id = Number(li.dataset.id);




    /*
        Delete
    */


    if(event.target.classList.contains("delete-btn")){


        tasks = tasks.filter(function(task){

            return task.id !== id;

        });



        saveTasks();


        renderTasks();


        return;

    }






    /*
        Edit
    */


    if(event.target.classList.contains("edit-btn")){


        handleEdit(li,event.target,id);


        return;

    }






    /*
        Complete
    */


    if(event.target.type === "checkbox"){


        tasks = tasks.map(function(task){


            if(task.id === id){

                task.completed =
                event.target.checked;

            }


            return task;


        });



        saveTasks();


        renderTasks();


    }



});









/*
    Edit Function
*/

function handleEdit(li,button,id){


    const input = li.querySelector(".edit-input");



    // SAVE MODE

    if(input){


        saveEdit(input,id);


        return;

    }





    // EDIT MODE


    const span = li.querySelector("span");


    const editInput =
    document.createElement("input");



    editInput.classList.add("edit-input");


    editInput.value =
    span.textContent.trim();




    li.replaceChild(
        editInput,
        span
    );



    button.textContent = "Save";

    button.classList.add("save");



    editInput.focus();



    editInput.setSelectionRange(
        editInput.value.length,
        editInput.value.length
    );



    editInput.addEventListener(
    "keydown",
    function(event){


        if(event.key === "Enter"){

            saveEdit(editInput,id);

        }


        if(event.key === "Escape"){

            renderTasks();

        }


    });



}








function saveEdit(input,id){


    const text =
    input.value.trim();



    if(text === ""){


        alert("⚠ Task cannot be empty");


        return;


    }



    tasks = tasks.map(function(task){


        if(task.id === id){


            task.text = text;


        }


        return task;


    });



    saveTasks();


    renderTasks();


}









/*
    Filters
*/

filterButtons.forEach(function(button){


    button.addEventListener(
    "click",
    function(){


        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });



        button.classList.add("active");



        currentFilter =
        button.dataset.filter;



        renderTasks();


    });


});









/*
    Clear Completed
*/

clearCompletedBtn.addEventListener(
"click",
function(){


    tasks = tasks.filter(function(task){

        return !task.completed;

    });



    saveTasks();


    renderTasks();


});







/*
    Initial Load
*/

renderTasks();