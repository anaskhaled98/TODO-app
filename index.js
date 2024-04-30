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
        [x] Empty State
        [x] toggleTask
        [x] toggleCompletedTasks
        [x] toggleAllTasks
        [x] toggleActiveTasks
        [x] Clear completed
        [x] Count tasks
        [ ] Drag and Drop
        [ ] Refactor
*/

import {
  addBtn,
  checkBtns,
  clearBtn,
  counterBtn,
  deleteBtns,
  filterBtns,
  inputElement,
  taskList,
} from './scripts/elements';

const addTask = (e) => {
  e.preventDefault();
  const taskValue = inputElement.value;
  if (!taskValue.trim()) return;

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData('tasks') || [];

  countingTasks('increase');

  tasks.push(task);

  saveToDB('tasks', tasks);

  initTaskList(tasks);
};

const countingTasks = (state) => {
  let counter = fetchData('counter') || 0;
  if (state == 'increase') counter++;
  else if (state == 'decrease') counter--;
  counterBtn.innerHTML = `${counter}`;
  saveToDB('counter', counter);
};

const renderTasklist = (tasks) => {
  let result = '';
  tasks.forEach((task) => {
    result += `<li
          class="taskList__taskContent ${task.isCompleted ? 'taskList__taskContent--isCompleted' : ''}"
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
  countingTasks();
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
  if (!tasks[index].isCompleted) countingTasks('decrease');
  tasks.splice(index, 1);
  saveToDB('tasks', tasks);
  initTaskList(tasks);
};

const toggleTask = (element, index) => {
  const tasks = fetchData('tasks');
  element.parentElement.classList.toggle('taskList__taskContent--isCompleted');
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB('tasks', tasks);
  (tasks[index].isCompleted) ? countingTasks('decrease') : countingTasks('increase');
};

const filterTasks = (button) => {
  document.querySelector('.active').classList.remove('active');
  button.classList.add('active');
  const styles = button.classList;
  if (styles.contains('allButton')) taskList.classList = 'taskList__list';
  else if (styles.contains('activeButton')) taskList.classList = 'taskList__list taskList__list--hideCompleted';
  else if (styles.contains('completedButton')) taskList.classList = 'taskList__list taskList__list--hideActive';
};

const clearCompletedTasks = () => {
  let tasks = fetchData('tasks');
  tasks = tasks.filter((task) => !task.isCompleted);
  saveToDB('tasks', tasks);
  initTaskList(tasks);
};

filterBtns.forEach((button) => {
  button.addEventListener('click', () => {
    filterTasks(button);
  });
});

const initTaskListener = () => {
  deleteBtns().forEach((element, index) => {
    element.addEventListener('click', () => {
      deleteTask(index);
    });
  });

  checkBtns().forEach((element, index) => {
    element.addEventListener('click', () => {
      toggleTask(element, index);
    });
  });
};

addBtn.addEventListener('click', addTask);

clearBtn.addEventListener('click', clearCompletedTasks);

initDataAtStartup();
