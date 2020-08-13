let formTask = document.querySelector('.form-1');
let ol = document.querySelector('.ol-1');
let inputMain = document.querySelector('.input-1');
let messageType = document.querySelector('select');
let ulDone = document.querySelector('.done-list');
let daySelect = document.querySelector('.day');
let monthSelect = document.querySelector('.month');

function dataSet() {
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
dataSet();

formTask.addEventListener('submit', event => {
  event.preventDefault();
  let newLi = document.createElement('li');
  //В спан я буду записывать текст из инпута
  let newSpan = document.createElement('span');
  newSpan.textContent = document.querySelector('.input-1').value;

  //Кнопка удаления
  let delButton = document.createElement('button');
  delButton.classList.add('delet-but');
  delButton.textContent = 'удалить';
  delButton.addEventListener('click', () => newLi.remove())
  
  //Кнопка редактирования
  let redButton = document.createElement('button');
  redButton.classList.add('redact-but');
  redButton.textContent = 'редактировать';
  redButton.addEventListener('click', () => {
    let redInput = document.createElement('input');
    newLi.append(redInput);
    redInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {  
        newSpan.textContent = redInput.value;
        redInput.remove();
      }
    })
  })

  //Вывод пунктов списка: если инпут не пустой - вывод.
  if (newSpan.textContent !='') {
    ol.appendChild(newLi);

    //Создаю и вставляю чекбокс "сделано"
    let done = document.createElement('input')
    done.setAttribute('type', 'checkbox');
    newLi.append(done);
    //Проверка чекбокса "сделано"
    done.addEventListener('click', () => {
      //Проверка на заполнение, чтобы не отправить пустой в выполненное
      if (newSpan.textContent !='') {
        let doneLi = newLi;
        doneLi.textContent = newSpan.textContent; 
        ulDone.append(doneLi);
        doneLi.classList.add('checked');
      }
    })

    let dataP = document.createElement('p');
    dataP.textContent = `${daySelect.value}-го ${monthSelect.value}`;
    //Вывод в <li>: текста в <span>,даты через фунецию, которая возвращает строку, удаление, редактирование
    newLi.append(newSpan);
    newLi.append(dataP);
    newLi.appendChild(delButton);
    newLi.appendChild(redButton);

    //Выбор приоритета сообщения проверкой селекта "важное / обычное" и добавлением класса
    if (messageType.value == 'warning') {newLi.classList.add('warning');}
    else {newLi.classList.add('regular');}
  }
  inputMain.value = '';
})
