export default class PopUpGenerator {
  constructor() {
    //Контейнер для всплывающего окна
    this.popUpDiv = createElement('div', 'container-popUp');
    
    //Форма для всплывающего окна
    this.popUpForm = createElement('form', 'form-popUp');
    //Кнопка для закрытия всплывающего окна
    this.popCancelButton = createElement('button', 'pop-cancel-button');
    this.popCancelButton.textContent = 'X';
    this.popCancelButton.addEventListener('click', e => {
      e.preventDefault();
      this.popUpDiv.remove();
    });
    
    //Кнопка для подтверждения
    this.popUpApplyButton = createElement('button', 'pop-add-button');
    this.popUpApplyButton.textContent = 'CHANGE';
    
    //Подзаголовок в окне (будет редактироваться через .textContent)
    this.h2 = createElement('h2', 'h2-text');
    
    //Инпут в который вводится текст (будет редактироваться через .value)
    this.popUpText = createElement('input', 'input-text');
    this.popUpText.setAttribute('type', 'text');
    
    //Создание form окна (пример сборки формы)
    // this.popUpForm.append(this.popCancelButton, this.h2, this.popUpText, this.popUpApplyButton);
    
    //Добавление формы в контейнер
    this.popUpDiv.append(this.popUpForm);
    document.body.prepend(this.popUpDiv);
    this.popUpText.focus();
    
    //Закрытие окна на ESC
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) this.popUpDiv.remove()
    }) 
  }
}

function createElement(tagName, tagClass) {
  const tag = document.createElement(`${tagName}`);
  tag.classList.add(`${tagClass}`);
  return tag
}