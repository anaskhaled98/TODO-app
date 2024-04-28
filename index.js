/*
TODO
- Toggle
        [ ] toggleDarkMode
- Tasks
        [x] saveToDB
        [x] fetchData
        [x] initDataAtStartup
        [x] initTaskList
        [x] renderTasklist
        [x] addTask
        [x] deleteTask
        [ ] toggleTask
        [ ] toggleCompletedTasks
        [x] Empty State
        [ ] toggleAllTasks
        [ ] toggleActiveTasks
        [ ] Clear completed
        [ ] Count tasks
        [ ] Drag and Drop
*/

import {
  addBtn, deleteBtns, inputElement, taskList,
} from './scripts/elements';

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

  initTaskList(tasks);
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
  taskList.innerHTML = result;
  inputElement.value = '';
};

const fetchData = (tasks) => {
  const data = localStorage.getItem(tasks);
  return data ? JSON.parse(data) : false;
};

const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initDataAtStartup = () => {
  initTaskList(fetchData('tasks'));
};

const renderEmptyState = () => {
  taskList.innerHTML = '<p class="emptyList">Empty List...</p>';
};

const initTaskList = (tasks) => {
  if (tasks.length) {
    renderTasklist(tasks);
    initTaskListener();
  } else {
    renderEmptyState();
  }
};

const deleteTask = (index) => {
  const tasks = fetchData('tasks');
  tasks.splice(index, 1);
  saveToDB('tasks', tasks);

  initTaskList(tasks);
};

const initTaskListener = () => {
  deleteBtns().forEach((element, index) => {
    element.addEventListener('click', () => {
      deleteTask(index);
    });
  });
};

addBtn.addEventListener('click', addTask);

initDataAtStartup();
