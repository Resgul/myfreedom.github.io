let starship = document.createElement('div'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  score = document.querySelector('.score'),
  bang = document.createElement('div'),
  fire = document.createElement('div'),
  time = document.querySelector('.timer'),
  player = document.querySelector('.player-name'),
  results = document.querySelector('.results');
starship.classList.add('starship');
bang.classList.add('bang');
fire.classList.add('fire');

let settings = {
  playerName: player.value,
  timeout: 20,
  score: 0,
  x1: 0,
  x2: 0,
  y: 0
}

function timer(obj, ship) {
  time.textContent = `time: ${obj.timeout}`;
  obj.timeout--;
  if (obj.timeout >= 0) {
    return setTimeout(() => timer(obj, ship), 1000)
  } else {
    writeResult(settings, db);
    showResults(results, gameArea, db);
    ship.remove();
  }
}

function startButton() {
  start.classList.toggle('hide');
  startGame(starship);
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
  if (obj.score === 2) {
  ship.style.background = 'url(img/ship/starship1.png)';
  ship.style.backgroundSize = 'contain';
  }
  if (obj.score === 4) {
    ship.style.background = 'url(img/ship/starship2.png)';
    ship.style.backgroundSize = 'contain';
  }
  if (obj.score === 8) {
    ship.style.background = 'url(img/ship/starship3.png)';
    ship.style.backgroundSize = 'contain';
  }
  if (obj.score === 12) {
    ship.style.background = 'url(img/ship/starship4.png)';
    ship.style.backgroundSize = 'contain';
  }
  if (obj.score === 18) {
    ship.style.background = 'url(img/ship/starship5.png)';
    ship.style.backgroundSize = 'contain';
  }
  if (obj.score === 20) {
    ship.style.background = 'url(img/bang.gif)';
    ship.style.backgroundSize = 'contain';
    ship.style.width = '400px';
    ship.style.height = '400px';
    ship.style.backgroundRepeat = 'no-repeat';
  }
}

function shipCreation(area ,ship) {
  ship.style.left = '35%';
  ship.style.top = '45%';
  return area.appendChild(ship)
}

function startGame(ship) {
  player.classList.add('hide');
  settings.playerName = player.value;
  timer(settings, starship);
  shipCreation(gameArea, starship);
  ship.addEventListener('mouseover', () => {
    setTimeout(() => {
      shooting(starship, bang);
      shipMoving(settings.y, starship);
      shipRotation(settings.x1, settings.x2, starship);
      getDamages(settings, starship);
    }, 200) // Задержкой регулируется реакция корабля
  })  
}

start.addEventListener('click', startButton)
