let inputbx = document.getElementById("input-box");
let licon = document.getElementById("tasks");

// Load saved tasks from localStorage
function loaddata() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Save tasks to localStorage
function svdata() {
    let tasks = [];
    document.querySelectorAll("#tasks li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let isCompleted = li.querySelector(".checkbox").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task to the DOM
function addTaskToDOM(taskText, isCompleted = false) {
    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.classList.add("checkbox"); // Add class for CSS styling
    checkbox.addEventListener('change', toggleComplete);

    // Create span for the task text
    let span = document.createElement("span");
    span.textContent = taskText;

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn"); // Add class for CSS styling
    deleteBtn.addEventListener('click', removeTask);

    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add completed class if the task is already completed
    if (isCompleted) {
        li.classList.add("completed");
    }

    // Append the list item to the task list
    licon.appendChild(li);
}

// Add task function
function addtask() {
    if (inputbx.value === '') {
        alert("SET YOUR GOAL FIRST");
    } else {
        addTaskToDOM(inputbx.value);  // Add task to DOM
        svdata(); // Save updated tasks to localStorage
    }
    inputbx.value = "";  // Clear the input field
}

// Remove task function
function removeTask(e) {
    e.target.parentElement.remove();
    svdata(); // Save updated tasks to localStorage
}

// Toggle task completion
function toggleComplete(e) {
    let li = e.target.parentElement;
    if (e.target.checked) {
        li.classList.add("completed"); // Add strikethrough when checked
    } else {
        li.classList.remove("completed"); // Remove strikethrough when unchecked
    }
    svdata(); // Save updated tasks to localStorage
}

// Trigger add task when pressing Enter
document.getElementById('input-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('enter').click(); // Trigger the Add Task button
    }
});

// Load data on page load
loaddata();
