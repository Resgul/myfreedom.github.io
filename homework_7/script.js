let inputMain = document.querySelector('.input-1');
let messageType = document.querySelector('select');
let ulDone = document.querySelector('.done-list');
let daySelect = document.querySelector('.day');
let monthSelect = document.querySelector('.month');

//Функция для заполнения селекта с датой
function datеSelectFilling() {
  let month = [{mon:'январь', mona:'января', days: 31},
              {mon:'февраль', mona:'февраля', days: 28},
              {mon:'март', mona:'марта', days: 31},
              {mon:'апрель', mona:'апреля', days: 30},
              {mon:'май', mona:'мая', days: 31},
              {mon:'июнь', mona:'июня', days: 30},
              {mon:'июль', mona:'июля', days: 31},
              {mon:'август', mona:'августа', days: 31},
              {mon:'сентябрь', mona:'сентября', days: 30},
              {mon:'октябрь', mona:'октября', days: 31},
              {mon:'ноябрь', mona:'ноября', days: 30},
              {mon:'декабрь', mona:'декабря', days: 31}];

  //Заполняю циклом for селект с месяцами
  for (let i = 0; i < month.length; i++) {
    let monthOption = document.createElement('option');
    monthOption.textContent = month[i].mon;
    monthOption.setAttribute('value', `${month[i].mona}`);
    monthSelect.appendChild(monthOption);
  }

  //По клику на селект с месяцами генерируется количество дней для селекта дней
  monthSelect.addEventListener('click', () => {
    //Определяю какаой месяц выбран в селекте
    let keyM = monthSelect.value;
    let j = 0;
    for(let key in month) {
      //присваиваю j количество дней выбранного месяца 
      if (month[key].mona === keyM) j = month[key].days;
    }
    daySelect.textContent = '';
    //Заполняю селект с количеством дней, он зависит от выбранного месяца
    for (let i = 1; i <= j; i++) {
      let dayOption = document.createElement('option');
      dayOption.textContent = i;
      dayOption.setAttribute('value', `${i}`);
      daySelect.appendChild(dayOption);
    }
  })
}
//Кнопка редактирования
function createRedButton(li, text, obj) {
  let redButton = document.createElement('button');
  redButton.classList.add('redact-but');
  redButton.textContent = 'редактировать';
  redButton.addEventListener('click', () => {
    let redInput = document.createElement('input');
    li.append(redInput);
    redInput.addEventListener('keyup', (event) => {
      //При нажатии на ENTER
      if (event.keyCode === 13) {
        //Отправляется запрос на айди таска  
        fetch(`https://todoappexamplejs.herokuapp.com/items/${obj.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ title: redInput.value })
        })
        .then(() => {text.textContent = redInput.value})
        .then(() => {
          text.textContent = redInput.value;
          redInput.remove();
        })
      }
    })
  })
  return li.appendChild(redButton);
}
//Кнопка удаления
function createDelButton(li, obj) {
  let delButton = document.createElement('button');
  delButton.classList.add('delet-but');
  delButton.textContent = 'удалить';
  delButton.addEventListener('click', () => {
    //Запрос на айди таска
    fetch(`https://todoappexamplejs.herokuapp.com/items/${obj.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => li.remove())
  })
  li.appendChild(delButton);
}
//Чекбокс (как-то я усложнил со вторым списком, может потом переделаю этот момент)
function createCheckbox(li, ulForDoneLi, text, obj) {
  //Создаю и вставляю чекбокс "сделано"
  let done = document.createElement('input')
  done.setAttribute('type', 'checkbox');
  li.append(done);
  //Если обеъкт существует, то сразу заношу выполненные таски во второй список ulForDoneLi
  if (obj) {
    if (obj.done == true) {
      let doneLi = li;
      doneLi.textContent = obj.title; 
      ulForDoneLi.append(doneLi);
      doneLi.classList.add('checked');
    }
  }
  
  //Проверка чекбокса "сделано"
  done.addEventListener('click', () => {
    //Проверка на заполнение, чтобы не отправить пустой в выполненное
    if (text.textContent !='') {
      let doneLi = li;
      doneLi.textContent = text.textContent; 
      ulForDoneLi.append(doneLi);
      doneLi.classList.add('checked');
      //Отправляю на сервер значение done = тру
      fetch(`https://todoappexamplejs.herokuapp.com/items/${obj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ done: true })
      })      
    }
  })
}
//Определение даты из селекта или таска
function addDateValue(li, day, month, obj) {
  let dataP = document.createElement('p');
  //Если объект существует, то значение даты возьмется из него
  if (obj) {
    dataP.textContent = obj.created_at.slice(0, 10);
  } else {
    dataP.textContent = `${day.value}-го ${month.value}`;
  }
  return li.append(dataP);
}
//Функция заполнения туду листа данными с сервера, асинхронная для разнообразия
async function todoFilling() {
  let responseToDo = await fetch('https://todoappexamplejs.herokuapp.com/items.json');
  //Мой массив объектов тудушек
  let dataToDo = await responseToDo.json();
  //Вся эта часть с заполнением с сервера еще будет пратически повторяться
  //при заполнении туду вручную, может можно будет как-то объеденить всё это дело 
  for (let task of dataToDo) {
    let newLi = document.createElement('li');
    //В спан я буду записывать текст из title (ранее был input, просто копировал блок)
    let textFromInput = document.createElement('span');
    textFromInput.textContent = task.title;
    document.querySelector('.ol-1').appendChild(newLi);
    //Если таск выполенен, добаляю его во второй список
    if (task.done == true) {
      createCheckbox(newLi, ulDone, textFromInput, task);
    } else {
      //Разделил это на два разных блока, чтобы к выполненному таску во втором списке не добалялись кнопки, дата и прочее
      createCheckbox(newLi, ulDone, textFromInput, task);
      newLi.append(textFromInput);
      addDateValue(newLi, daySelect, monthSelect, task);
      createDelButton(newLi, task);
      createRedButton(newLi, textFromInput, task);
    }
    //Для категории важное указан особый стиль
    if (task.category == 'warning') {newLi.classList.add('warning');}
    else {newLi.classList.add('regular');}
  }
}

todoFilling();
datеSelectFilling();
document.querySelector('.form-1').addEventListener('submit', event => {
  event.preventDefault();
  let newLi = document.createElement('li');
  //В спан я буду записывать текст из инпута
  let textFromInput = document.createElement('span');
  textFromInput.textContent = document.querySelector('.input-1').value;
  
  //Вывод пунктов списка: если инпут не пустой - вывод.
  if (textFromInput.textContent !='') {
    document.querySelector('.ol-1').appendChild(newLi);

    //Вывод в <li>: текста в <span>,даты через функцию, которая возвращает строку, удаление, редактирование
    createCheckbox(newLi, ulDone, textFromInput);
    newLi.append(textFromInput);
    addDateValue(newLi, daySelect, monthSelect);
    createDelButton(newLi);
    createRedButton(newLi, textFromInput);
    
    //Выбор приоритета сообщения проверкой селекта "важное / обычное" и добавлением класса
    if (messageType.value == 'warning') {newLi.classList.add('warning');}
    else {newLi.classList.add('regular');}
    //Это блок поиска свободного id, для добавления таска
    let id;
    let promID = fetch(`https://todoappexamplejs.herokuapp.com/items.json`)
    .then(response => response.json())
    .then(respArr => {
      let ids = [];
      //Проходя по массиву я нахожу максимальный существующий id и добавляю к нему единицу
      for (let element of respArr) {
        ids.push(Number(element.id));
      }
      id = Math.max(...ids) + 1;
      //Создаю объект для передачи, его можно будет потом в другое место перенести
      let obj = {
        id: id,
        title: textFromInput.textContent,
        category: messageType.value,
        //Когда поправлю done пригодится
        // done: answer = (document.querySelector('li').classList.contains('checked')) ? true : false
      }
      return obj
    })
    promID.then(obj => {fetch(`https://todoappexamplejs.herokuapp.com/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(obj)
    })})
  }
      inputMain.value = '';
})
