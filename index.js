import {
  addBtn,
  appElement,
  checkBtns,
  clearBtn,
  counterBtn,
  darkThemeImg,
  deleteBtns,
  dragDropMessage,
  filterBtns,
  inputElement,
  taskList,
  tasks,
  themeBtn,
} from './scripts/elements';

const themeToggle = () => {
  appElement.classList.toggle('app--isDark');
  if (appElement.classList.contains('app--isDark')) {
    darkThemeImg.src = './images/icon-sun.svg';
    saveToDB('themeMode', 'Dark');
  } else {
    darkThemeImg.src = './images/icon-moon.svg';
    saveToDB('themeMode', 'Light');
  }
};

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
          draggable = "true"
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
                src="./images/icon-basket.svg"
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
  (fetchData('themeMode') === 'Dark') && themeToggle();

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
  (tasks.length > 1) ? dragDropMessage.classList.remove('hide') : dragDropMessage.classList.add('hide');
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

const initTaskListDragging = (e) => {
  e.preventDefault();
  const draggingItem = taskList.querySelector('.dragging');
  const siblings = [...taskList.querySelectorAll('.taskList__taskContent:not(.dragging)')];
  const nextSibling = siblings.find((sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);
  taskList.insertBefore(draggingItem, nextSibling);
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

  tasks().forEach((task) => {
    task.addEventListener('dragstart', () => setTimeout(() => task.classList.add('dragging'), 0));
    task.addEventListener('dragend', () => task.classList.remove('dragging'));
  });

  taskList.addEventListener('dragover', initTaskListDragging);
};

addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearCompletedTasks);
themeBtn.addEventListener('click', themeToggle);

initDataAtStartup();
