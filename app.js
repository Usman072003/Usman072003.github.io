const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const deleteTask = document.getElementById("delete-task");
const audio = new Audio('congrats-horns-made-with-Voicemod.mp3');


addTaskButton.addEventListener("click", () => {
    const taskColor = document.getElementById('taskColor').value; // Get the selected color

	const task = taskInput.value;
	const priority = priorityInput.value;
	const deadline = deadlineInput.value;
	if (task.trim() === "" || deadline === "") {
		document.getElementById("alertText").innerHTML = "please select an upcoming date";
		return; // Don't add task if task or deadline is empty
	}

	const selectedDate = new Date(deadline);
	const currentDate = new Date();

	if (selectedDate <= currentDate) {
		document.getElementById("alertText").innerHTML = "please select an upcoming date for this deadline";
		return; // Don't add task if deadline is not in the future
	}


    const taskItem = document.createElement("div");
    
taskItem.classList.add("task");
taskItem.style.backgroundColor = taskColor; // Set the background color of the entire task item

taskItem.innerHTML = `
  <label>
    <span>${task}</span>
    <input type="checkbox" class="task-checkbox" />
  </label>
  <p>Priority: ${priority}</p>
  <p>Deadline: ${deadline}</p>
  <button class="mark-done">Mark Done</button>
  <button class="undo-done" style="display:none;">Undo</button>
  <button class="delete-task">Delete</button>
`;

    

	taskList.appendChild(taskItem);

	taskInput.value = "";
	priorityInput.value = "top";
	deadlineInput.value = "";
});

//let hideTimeout; // Variable to store the timeout ID
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2"; // Example of marking as done.
        event.target.style.display = "none"; // Hide "Mark Done" button.
        // Assuming '.js-container' is your designated container
        //window.confettiful = new Confettiful(document.querySelector('.js-container'));
        const successContainer = document.getElementById("successMessageContainer").innerHTML = `
      <div class="js-container container" style="top:0px !important;"></div>

      <div style="text-align:center;margin-top:30px;position: fixed;width:100%;height:100%;top:0px;left:0px;">
        <div class="checkmark-circle">
          <div class="background"></div>
          <div class="checkmark draw"></div>
        </div>
      </div>
    `;
    
    setTimeout(() => {
        successMessageContainer.style.display = 'none';
    }, 3000);
       
    audio.play().catch(error => console.error("Audio play failed:", error));


        
        const undoButton = taskItem.querySelector(".undo-done");
        undoButton.style.display = "inline"; // Show "Undo" button.
    } else if (event.target.classList.contains("undo-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = ""; // Reset background color.
        
        event.target.style.display = "none"; // Hide "Undo" button.
        const markDoneButton = taskItem.querySelector(".mark-done");
        markDoneButton.style.display = "inline"; // Show "Mark Done" button.
    } else if (event.target.classList.contains("delete-task")) {
        const taskItem = event.target.parentElement;
        taskItem.remove(); // Remove the task item from the DOM.
    }
});

function markTaskAsDone() {
    const successContainer = document.getElementById("successMessageContainer");
    
    // Insert some content and show the container
    successContainer.innerHTML = `<p>Congratulations! Task completed.</p>`;
    successContainer.style.display = 'block'; // Make sure the container is visible
    
    // Use setTimeout to hide the container after 3 seconds
    setTimeout(() => {
      successContainer.style.display = 'none';
    }, 3000);
  }