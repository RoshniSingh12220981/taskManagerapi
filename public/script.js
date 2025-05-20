// API URL - adjust this to match your backend URL
const API_URL = 'http://localhost:3000';

// Fetch all tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Add new task
async function addTask() {
  const taskInput = document.getElementById('taskInput');
  const title = taskInput.value.trim();

  if (!title) return;

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      taskInput.value = '';
      fetchTasks();
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Delete task
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTasks();
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Update task status
async function updateTaskStatus(id, newStatus) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      fetchTasks();
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

// Display tasks in the UI
function displayTasks(tasks) {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';

    taskElement.innerHTML = `
            <div>
                <span>${task.title}</span>
                <span class="task-status status-${task.status}">${task.status}</span>
            </div>
            <div>
                <select onchange="updateTaskStatus('${task._id}', this.value)">
                    <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;

    tasksContainer.appendChild(taskElement);
  });
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks); 