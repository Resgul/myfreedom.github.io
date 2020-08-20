let inputMain = document.querySelector('.input-1');
let messageType = document.querySelector('select');
let ulDone = document.querySelector('.done-list');
let daySelect = document.querySelector('.day');
let monthSelect = document.querySelector('.month');

function datеSelectFilling() {
  let month = [{mon:'январь', mona:'января'},
              {mon:'февраль', mona:'февраля'},
              {mon:'март', mona:'марта'},
              {mon:'апрель', mona:'апреля'},
              {mon:'май', mona:'мая'},
              {mon:'июнь', mona:'июня'},
              {mon:'июль', mona:'июля'},
              {mon:'август', mona:'августа'},
              {mon:'сентябрь', mona:'сентября'},
              {mon:'октябрь', mona:'октября'},
              {mon:'ноябрь', mona:'ноября'},
              {mon:'декабрь', mona:'декабря'}];
  let month31 = ['января', 'марта', 'мая', 'июля', 'августа', 'октября', 'декабря'];
  let month30 = ['апреля', 'июня', 'сентября', 'ноября'];
  
  //Заполняю циклом for селект с месяцами
  for (let i = 0; i < month.length; i++) {
    let monthOption = document.createElement('option');
    monthOption.textContent = month[i].mon;
    monthOption.setAttribute('value', `${month[i].mona}`);
    monthSelect.appendChild(monthOption);
  }

  //По клику на селект с месяцами генерируется количество дней для селекта дней
  monthSelect.addEventListener('click', () => {
    daySelect.textContent = '';

    //Если месяц входит в один из массивов с месяцами, выбирается кол-во дней для следующего цикла for
    if (month31.includes(monthSelect.value)) {
      var days = 31;
    } else {
        if (month30.includes(monthSelect.value)) {
          var days = 30;
        } else {
            var days = 28;
          }
      }
    
    //Заполняю селект с количеством дней, он зависит от выбранного месяца
    for (let i = 1; i <= days; i++) {
      let dayOption = document.createElement('option');
      dayOption.textContent = i;
      dayOption.setAttribute('value', `${i}`);
      daySelect.appendChild(dayOption);
    }
  })
}

function createRedButton(li, text) {
  //Кнопка редактирования
  let redButton = document.createElement('button');
  redButton.classList.add('redact-but');
  redButton.textContent = 'редактировать';
  redButton.addEventListener('click', () => {
    let redInput = document.createElement('input');
    li.append(redInput);
    redInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {  
        text.textContent = redInput.value;
        redInput.remove();
      }
    })
  })
  return li.appendChild(redButton);
}

function createDelButton(li) {
//Кнопка удаления
  let delButton = document.createElement('button');
  delButton.classList.add('delet-but');
  delButton.textContent = 'удалить';
  delButton.addEventListener('click', () => li.remove())
  li.appendChild(delButton);
}

function createCheckbox(li, ulForDoneLi, text) {
  //Создаю и вставляю чекбокс "сделано"
  let done = document.createElement('input')
  done.setAttribute('type', 'checkbox');
  li.append(done);
  //Проверка чекбокса "сделано"
  done.addEventListener('click', () => {
    //Проверка на заполнение, чтобы не отправить пустой в выполненное
    if (text.textContent !='') {
      let doneLi = li;
      doneLi.textContent = text.textContent; 
      ulForDoneLi.append(doneLi);
      doneLi.classList.add('checked');
    }
  })
}

function addDateValue(li, day, month) {
  let dataP = document.createElement('p');
  dataP.textContent = `${day.value}-го ${month.value}`;
  return li.append(dataP);
}

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

    //Вывод в <li>: текста в <span>,даты через фунецию, которая возвращает строку, удаление, редактирование
    createCheckbox(newLi, ulDone, textFromInput);
    newLi.append(textFromInput);
    addDateValue(newLi, daySelect, monthSelect);
    createDelButton(newLi);
    createRedButton(newLi, textFromInput);  
    
    //Выбор приоритета сообщения проверкой селекта "важное / обычное" и добавлением класса
    if (messageType.value == 'warning') {newLi.classList.add('warning');}
    else {newLi.classList.add('regular');}
  }
  console.log(event)
  inputMain.value = '';
})
