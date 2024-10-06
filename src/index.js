document.addEventListener('DOMContentLoaded', function () {
  const newTaskDescription = document.getElementById('new-task-description');
  const priority = document.getElementById('priority');
  const user = document.getElementById('user');
  const duration = document.getElementById('duration');
  const dueDate = document.getElementById('due-date');
  const createTaskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('task-list');
  const sortButton = document.getElementById('sort-button');
  const editButton = document.getElementById('edit-button');

  let tasks = [];
  let sortOrder = 'asc';

  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${task.description} ${task.priority} ${task.user}  ${task.duration} -${task.dueDate}`;
      if (task.priority == 'High') {
        listItem.style.color = 'red';
       } else if (task.priority == 'Medium'){
        listItem.style.color = 'yellow';
       } else if (task.priority == 'Low'){
        listItem.style.color = 'green';
       }    
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => {
        deleteTask(index);
      };
      listItem.appendChild(deleteButton);
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => {
        const taskDescription = task.description;
        const newTaskDescription = prompt('Enter new task description:');
        task.description = newTaskDescription;
        renderTasks();
      };
      listItem.appendChild(editButton);
      taskList.appendChild(listItem);
    });
  };

  createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const task = {
      description: newTaskDescription.value,
      priority: priority.value,
      user: user.value,
      duration: duration.value,
      dueDate: dueDate.value,
    };
    tasks.push(task);
    renderTasks();

    
    newTaskDescription.value = '';
    priority.value = '';
    user.value = '';
    duration.value = '';
    dueDate.value = '';
  });


  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };


  window.editTask = (index) => {
    const task = tasks[index];
    newTaskDescription.value = task.description;
    priority.value = task.priority;
    user.value = task.user;
    duration.value = task.duration;
    dueDate.value = task.dueDate;
    
    tasks.splice(index, 1);
    renderTasks();
  };

  sortButton.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return sortOrder === 'asc' 
        ? priorityOrder[a.priority] - priorityOrder[b.priority] 
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    renderTasks();
  });
});
