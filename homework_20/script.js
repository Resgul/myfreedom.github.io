let starship = document.createElement('div'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  score = document.querySelector('.score'),
  bang = document.createElement('div');
starship.classList.add('starship');
bang.classList.add('bang');

let settings = {
  score: 0,
  x1: 0,
  x2: 0,
  y: 0
}

function startButton() {
  start.classList.toggle('hide');
  startGame();
}

function shipMoving(y, ship) {
  settings.x1 = ship.style.left;
  ship.style.top = y;
  settings.y = (Math.random() * (document.documentElement.clientHeight - ship.clientHeight)) + 'px';
  ship.style.left = settings.x2 = (Math.random() * (document.documentElement.clientWidth - ship.clientWidth)) + 'px';

}

function shipRotation(x1, x2, ship) {
  if (x1 < x2) {
    ship.style.transform = 'rotate(30deg)';
    setTimeout(() => ship.style.transform = 'rotate(0deg)', 200);
  } else {
    ship.style.transform = 'rotate(-30deg)';
    setTimeout(() => ship.style.transform = 'rotate(0deg)', 200);
  }
}

function shooting(ship, bang) {
  ship.onclick = function() {
    settings.score++;
    bang.style.left = 30 + 'px';
    bang.style.top = -55 + 'px';
    ship.append(bang);
    setTimeout(() => {bang.remove()}, 500)
  }
  scoreUP(score, settings);
}

function scoreUP(score, obj) {
  score.textContent = `score: ${obj.score}`;
}

function getDamages(obj, ship) {
  if (obj.score === 2) ship.style.background = 'url(img/ship/starship1.png)';
  ship.style.backgroundSize = 'contain';
  if (obj.score === 5) ship.style.background = 'url(img/ship/starship2.png)';
  ship.style.backgroundSize = 'contain';
  if (obj.score === 6) ship.style.background = 'url(img/bang.gif)';
  ship.style.backgroundSize = 'contain';
  ship.style.backgroundRepeat = 'no-repeat';
}

function startGame() {
  gameArea.appendChild(starship);
  starship.addEventListener('mouseover', () => {
    setTimeout(() => {
      shooting(starship, bang);
      shipMoving(settings.y, starship);
      shipRotation(settings.x1, settings.x2, starship);
      getDamages(settings, starship);
    }, 200) // Задержкой регулируется реакция корабля
  })  
}

start.addEventListener('click', startButton)
