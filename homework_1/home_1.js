let inputA = document.querySelector('.first-task-a');
let inputB = document.querySelector('.first-task-b');
let inputC = document.querySelector('.second-task-c');
let inputD = document.querySelector('.third-task-d');
let inputE = document.querySelector('.third-dot-task-e');
let button1 = document.querySelector('.first-task-button');
let button2 = document.querySelector('.second-task-button');
let button3 = document.querySelector('.third-task-button');
let button4 = document.querySelector('.third-dot-task-button');
let p1 = document.querySelector('.first-task-p');
let p2 = document.querySelector('.second-task-p');
let p3 = document.querySelector('.third-task-p');
let p4 = document.querySelector('.third-dot-task-p');

button1.onclick = function () {
  let a = Number(inputA.value);
  let b = Number(inputB.value);
  p1.textContent = 'Ответ ' + a;
  if (a > b) {p1.textContent = 'Значение "а"=' + a + ' больше, чем "b"=' + b;}
  else { if (a < b) {p1.textContent = 'Значение "b"=' + b + ' больше, чем "a"=' + a;}
      else {p1.textContent = 'Значения равны между собой';}; 
  }
}

button2.onclick = function () {
  p2.textContent = 'Ответ: ';
  for (i=0; i<100; i++) {
    let c = Number(inputC.value);
    p2.append(Math.pow(i, c) + ' ');
  }
}

button3.onclick = function () {
  p3.textContent = 'Ответ: ';
  let j = 0;
  while (j < 100) {
    let d = Number(inputD.value);
    p3.append(Math.pow(j, d) + ' ');
    j++;
  }
}

button4.onclick = function () {
  p4.textContent = 'Ответ: ';
  let k = 0;
  do {
    let e = Number(inputE.value);
    p4.append(Math.pow(k, e) + ' ');
    k++;
  } while (k < 100);
}