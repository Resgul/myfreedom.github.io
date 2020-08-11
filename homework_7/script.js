let formTask = document.querySelector('.form-1');
let ol = document.querySelector('.ol-1');
let inputMain = document.querySelector('.input-1');
let messageType = document.querySelector('select');
let ulDone = document.querySelector('.done-list');
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
    redInput.addEventListener('mouseout', () => {
      newSpan.textContent = redInput.value;
      redInput.remove();
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
        ulDone.append(doneLi)
        doneLi.classList.add('checked');
      }
    })

    newLi.append(newSpan);
    newLi.appendChild(delButton);
    newLi.appendChild(redButton);

    //Выбор приоритета сообщения проверкой селекта "важное / обычное" и добавлением класса
    if (messageType.value == 'warning') {newLi.classList.add('warning');}
    else {newLi.classList.add('regular');}
  }
  inputMain.value = '';
})
