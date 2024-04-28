/*
TODO
- Toggle
        [ ] toggleDarkMode
- Tasks
        [x] saveToDB
        [x] fetchData
        [ ] initDataAtStartup
        [ ] initTaskList
        [x] renderTasklist
        [x] addTask
        [ ] deleteTask
        [ ] toggleTask
        [ ] toggleCompletedTask
        [ ] Empty State
        [ ] Filters
        [ ] Clear completed
        [ ] Drag and Drop
*/

import { addBtn, inputElement, tasksList } from './scripts/elements';

const addTask = (e) => {
  e.preventDefault();
  const taskValue = inputElement.value;
  if (!taskValue.trim()) return;

  const task = {
    value: taskValue,
  };

  const tasks = fetchData('tasks') || [];

  tasks.push(task);

  saveToDB('tasks', tasks);

  renderTasklist(tasks);
};

const renderTasklist = (tasks) => {
  let result = '';
  tasks.forEach((task) => {
    result += `<li
          class="taskList__taskContent"
          >
            <button class="taskList__checkbox">
              <img
                src="./images/icon-check.svg"
                alt="check-icon"
                class="taskList__checkboxImg"
              />
            </button>
            <div class="taskList__valueContent">
              <p class="taskList__value">${task.value}</p>
              <img
                src="./images/icon-cross.svg"
                alt="basket-icon"
                class="taskList__deleteIcon"
              />
            </div>
        `;
  });
  tasksList.innerHTML = result;
  inputElement.value = '';
};

const fetchData = (tasks) => {
  const data = localStorage.getItem(tasks);
  return data ? JSON.parse(data) : false;
};

const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

addBtn.addEventListener('click', addTask);
