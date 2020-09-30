var firebaseConfig = {
  apiKey: "AIzaSyCQ7h4ZPAUvujRy0AUHU7NlE0IjDzXTa4g",
  authDomain: "project-resgul.firebaseapp.com",
  databaseURL: "https://project-resgul.firebaseio.com",
  projectId: "project-resgul",
  storageBucket: "project-resgul.appspot.com",
  messagingSenderId: "1006199687151",
  appId: "1:1006199687151:web:c1fa2c1830fdba44ad581a",
  measurementId: "G-X8KJS47900"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function writeResult(obj, base) {
  base.collection("starship_game").add({
  playerName: obj.playerName = (obj.playerName == '') ? 'player' : obj.playerName,
  score: obj.score
  })
}

function sortResultsMaxToMin(arrObj) {
  arrObj.sort(function (a, b) {
    return b.score - a.score;
  })
}

function createScroresList(uList, arr) {
  for (let i = 0; i < 15; i++) {
    let li = document.createElement('li');
    li.textContent = `${i+1}. ${arr[i].name} --- score: ${arr[i].score}`;
    uList.append(li);
  }
  return uList
}

function showResults(results, area, base) {
  results.classList.remove('hide');
  let ul = document.querySelector('.ul-results');
  let responseArray = [];
  base.collection('starship_game').get().then(response => response.forEach(list => {  
    responseArray.push({name: list.data().playerName, score: list.data().score});
    sortResultsMaxToMin(responseArray);
  })).then(() => {
    createScroresList(ul, responseArray);
    area.append(ul);
  })
}