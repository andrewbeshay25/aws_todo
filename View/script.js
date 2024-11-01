document.getElementById("todoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;

    if (task) {
        await addTask(task);  // Send task to the backend
        taskInput.value = ""; // Clear input after adding
    }
});
document.addEventListener("DOMContentLoaded", async function() {
    await loadTasks();  // Load tasks on page load
});

async function addTask(task) {
    const url = "https://j7m1cxy4ki.execute-api.us-east-2.amazonaws.com/dev/AddToDoItem";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task: task })
        });

        const result = await response.json();
        console.log(result.message); // Log success message
        
        // Display the new task in the list on the front end
        const taskList = document.getElementById("taskList");
        const taskItem = document.createElement("li");
        taskItem.textContent = task;
        taskList.appendChild(taskItem);

    } catch (error) {
        console.error("Error adding task:", error);
    }
}

async function loadTasks() {
    const url = "https://j7m1cxy4ki.execute-api.us-east-2.amazonaws.com/dev/GetToDoTasks";
    
    try {
        const response = await fetch(url, { method: "GET" });
        const tasks = await response.json();
        
        // Display each task on the front end
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";  // Clear the list before loading

        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task.task;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}
