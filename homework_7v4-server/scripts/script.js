const addButton = document.querySelector('.add-task-button'),
  taskMessage = document.querySelector('.task-input'),
  taskDate = document.querySelector('.task-date'),
  taskList = document.querySelector('.task-list'),
  taskCategory = document.querySelector('.task-category');
  const spanCategory = createElement('span', 'task-category');
  
  taskCategory.addEventListener('change', ()=> {
    if (taskCategory.value === 'своя категория') {
      let popUp = new PopUpCategory();
      popUp.createPopUp();
      popUp.popUpApplyButton.addEventListener('click', e => {
        e.preventDefault();
        spanCategory.textContent = `${popUp.popUpText.value}`
        popUp.popUpDiv.remove();
      })
    }
  })

// ------------------------------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ------------------------------
// быстрое создание элементов с заданным классом
function createElement(tagName, tagClass) {
  const tag = document.createElement(`${tagName}`);
  tag.classList.add(`${tagClass}`);
  return tag
}

function checkWindowWidth() {
  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 767) {
      taskMessage.setAttribute('placeholder', 'TASK MESSAGE');
    } else {
      taskMessage.setAttribute('placeholder', '');
    }
  })
}

function setDateToday(dataInput) {
  let d = new Date();
  dataInput.value = `${d.getFullYear()}-${String(101 + d.getMonth()).slice(1)}-${d.getDate()}`;
}

function collectPartsOfLi(li, list, messageContainer, task) {
  const div = createElement('div', 'div-list-element');
  addCheckbox(div, list, task);
  div.append(messageContainer);
  addCategoryfromServer(div, task);
  li.append(div);
  addEditButton(li, messageContainer, task);
  addDeleteButton(li, task);
  return li
}

function addCategoryfromServer(li, task) {
  const span = createElement('span', 'task-category');
  if (task.category) {
    span.textContent = `${task.category}`
  } 
  return li.append(span)
}

// конструктор всплывающего окна для кнопки редактирования
function PopUp(message) {
  this.createPopUp = function() {
    this.popUpDiv = createElement('div', 'container-popUp');
    this.popUpForm = createElement('form', 'form-popUp');
    this.popCancelButton = createElement('button', 'pop-cancel-button');
    this.popCancelButton.textContent = 'X';
    this.popCancelButton.addEventListener('click', e => {
      e.preventDefault();
      this.popUpDiv.remove();
    });
    this.popUpApplyButton = createElement('button', 'pop-add-button');
    this.popUpApplyButton.textContent = 'CHANGE';
    this.h2 = createElement('h2', 'h2-text');
    this.h2.textContent = "РЕДАКТИРОВАТЬ ЗАДАЧУ: ";
    this.popUpText = createElement('input', 'input-text');
    this.popUpText.setAttribute('type', 'text');
    this.popUpText.value = `${message}`;
    this.popUpDate = createElement('input', 'input-date');
    this.popUpDate.setAttribute('type', 'date');
    setDateToday(this.popUpDate);
    this.popUpForm.append(this.popCancelButton, this.h2, this.popUpDate, this.popUpText, this.popUpApplyButton);
    this.popUpDiv.append(this.popUpForm);
    document.body.prepend(this.popUpDiv);
    this.popUpText.focus();
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) this.popUpDiv.remove()
    }) 
  }
}

function PopUpCategory() {
  this.createPopUp = function() {
    this.popUpDiv = createElement('div', 'container-popUp');
    this.popUpForm = createElement('form', 'form-popUp');
    this.popCancelButton = createElement('button', 'pop-cancel-button');
    this.popCancelButton.textContent = 'X';
    this.popCancelButton.addEventListener('click', e => {
      e.preventDefault();
      this.popUpDiv.remove();
    });
    this.popUpApplyButton = createElement('button', 'pop-add-button');
    this.popUpApplyButton.textContent = 'CHANGE';
    this.h2 = createElement('h2', 'h2-text');
    this.h2.textContent = "ВВЕДИТЕ СВОЮ КАТЕГОРИЮ: ";
    this.popUpText = createElement('input', 'input-text');
    this.popUpText.setAttribute('type', 'text');
    this.popUpForm.append(this.popCancelButton, this.h2, this.popUpText, this.popUpApplyButton);
    this.popUpDiv.append(this.popUpForm);
    document.body.prepend(this.popUpDiv);
    this.popUpText.focus();
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) this.popUpDiv.remove()
    })
  }
}

// ------------------------------РАБОТА КНОПОК------------------------------
function loadTasksFromServer(list) {
  getTasksRequest()
  .then(tasks => {
    for (let task of tasks) {
      const li = createElement('li', 'task-list-element');
      const messageContainer = createElement('span', 'task-text');
      messageContainer.textContent = task.title;
      collectPartsOfLi(li, list, messageContainer, task);
      taskList.append(li);
      if (task.done) {
        li.querySelector('.div-list-element').classList.add('task-checked');
        li.querySelector('.task-checkbox').checked = true;
      }
      addCategoryStyle(li, task.category);  
    }
  })
}

function addCategoryStyle(li, category) {
  switch (category) {
    case 'обычное':
      li.querySelector('.div-list-element').classList.add('task-category-regular');
    break;
    case 'важное':
      li.querySelector('.div-list-element').classList.add('task-category-main');
    break;
    default:
      li.querySelector('.div-list-element').classList.add('task-category-custom');
    break;
  }
  return li
}

function getTasksRequest() {
  return fetch(`https://todoappexamplejs.herokuapp.com/items.json`)
  .then(response => response.json())
}

function categoryCheck(cat) {
  if (cat.value === 'обычное' || cat.value === 'важное') {
    spanCategory.textContent = `${cat.value}`;
    return spanCategory.textContent
  } else {
    return spanCategory.textContent
  }
}

// работа кнопки добавления задачи 
function addTask(message, date, list) {
  const li = createElement('li', 'task-list-element');
  const div = createElement('div', 'div-list-element');
  const messageContainer = createElement('span', 'task-text');
  messageContainer.textContent = `${message.value} сделать до ${date.value}`;
  addCheckbox(div, list);
  div.append(messageContainer);
  div.append(spanCategory);
  li.append(div);
  addEditButton(li, messageContainer);
  addDeleteButton(li);
  list.append(li);
  addCategoryStyle(li, taskCategory.value);
  postTaskRequest({
    title: messageContainer.textContent,
    done: false,
    category: categoryCheck(taskCategory),
  })
  .then(() => {
    list.innerHTML = '';
    loadTasksFromServer(list);
  })
}

function postTaskRequest(task) {
  return fetch(`https://todoappexamplejs.herokuapp.com/items.json`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(response => response.json())
}

// создать и добавить кнопку редактирования
function addEditButton (li, message, task) {
  const editButton = createElement('button', 'edit-task-button');
  const spanIcon = createElement('span', 'button-icon');
  const spanText = createElement('span', 'button-text');
  spanText.textContent = 'EDIT';
  editButton.append(spanIcon, spanText);
  li.append(editButton);
  editButton.addEventListener('click', () => editTask(message, task));
}

function editTask(message, task) {
  let textForEdit = message.textContent.slice(0,-22);
  let popUp = new PopUp(textForEdit);
  popUp.createPopUp();
  popUp.popUpApplyButton.addEventListener('click', event => {
    event.preventDefault();
    message.textContent = `${popUp.popUpText.value} сделать до ${popUp.popUpDate.value}`;
    editTaskRequest(message, task)
    popUp.popUpDiv.remove();
  })
}

function editTaskRequest(message, task) {
  return fetch(`https://todoappexamplejs.herokuapp.com/items/${task.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: message.textContent}),
  })
}

function addDeleteButton(li, task) {
  const button = createElement('button', 'delete-task-button');
  const spanIcon = createElement('span', 'button-icon');
  const spanText = createElement('span', 'button-text');
  spanText.textContent = 'DEL';
  button.append(spanIcon, spanText);
  li.append(button);
  button.addEventListener('click', () => {
    deleteTaskRequest(task)
    .then(() => {
      li.remove();
    })
  });
}

function deleteTaskRequest(task) {
  return fetch(`https://todoappexamplejs.herokuapp.com/items/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then()
}

function addCheckbox(div, list, task) {
  const checkbox = createElement('input', 'task-checkbox');
  checkbox.setAttribute('type', 'checkbox');
  div.prepend(checkbox);
  checkbox.addEventListener('click', () => {
    changeListElementStyleIfChecked(div, checkbox, task);
    list.append(div.closest('li'));
  });
}

function changeListElementStyleIfChecked(div, checkbox, task) {
  let isDone;
  if (checkbox.checked) {
    div.classList.add('task-checked');
    isDone = true;
  } else {
    div.classList.remove('task-checked');
    isDone = false;
  }
  checkboxDoneRequest(task, isDone);
}

function checkboxDoneRequest(task, done) {
  fetch(`https://todoappexamplejs.herokuapp.com/items/${task.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({done: done}),
  })
}
// --------------------------ПОЕХАЛИ--------------------------------------------------
setDateToday(taskDate);
loadTasksFromServer(taskList);
checkWindowWidth();

addButton.addEventListener('click', event => {
  event.preventDefault();
  addTask(taskMessage, taskDate, taskList)
  taskMessage.value = '';
});









